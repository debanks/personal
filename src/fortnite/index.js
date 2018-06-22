import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button, DropdownButton, MenuItem, ButtonGroup, Fade} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';
import FaBullseye from 'react-icons/lib/fa/bullseye';
import FaMapPin from 'react-icons/lib/fa/map-marker';
import FaClose from 'react-icons/lib/fa/close';
import FaCircle from 'react-icons/lib/fa/circle';
import LineTo from 'react-lineto';
import ReactHeatmap from 'react-heatmap';
import './index.sass';

class Fortnite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            stats: {
                Solo: {
                    matches: 0,
                    wins: 0,
                    kills: 0,
                    deaths: 0,
                    place: 0
                },
                Duo: {
                    matches: 0,
                    wins: 0,
                    kills: 0,
                    deaths: 0,
                    place: 0
                },
                Squad: {
                    matches: 0,
                    wins: 0,
                    kills: 0,
                    deaths: 0,
                    place: 0
                }
            },
            overall: {
                matches: 0,
                wins: 0,
                kills: 0,
                deaths: 0
            },
            killHeatmap: [],
            deathHeatmap: [],
            placeHeatmap: [],
            showMatch: false,
            selected: {},
            match: {},
            coords: 'plane_start',
            form: false,
            showHeatmap: false,
            killMax: 100,
            placeMax: 100,
            deathMax: 1000
        };

        fetch('http://api.davisbanks.com/api/fortnite')
            .then((res) => res.json())
            .then((data) => this.processData(data));

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.addMatch = this.addMatch.bind(this);
        this.trackPosition = this.trackPosition.bind(this);
        this.getMarkerStyle = this.getMarkerStyle.bind(this);
        this.getMarkerStyle2 = this.getMarkerStyle2.bind(this);
        this.updateMatch = this.updateMatch.bind(this);
        this.processData = this.processData.bind(this);
        this.processHeatmaps = this.processHeatmaps.bind(this);
    }

    processData(data) {

        let overall = {
            matches: 0,
            wins: 0,
            kills: 0,
            deaths: 0
        };

        let killHeatmap = [], placeHeatmap = [], deathHeatmap = [];

        let stats = {
            Solo: {
                matches: 0,
                wins: 0,
                kills: 0,
                deaths: 0,
                place: 0
            },
            Duo: {
                matches: 0,
                wins: 0,
                kills: 0,
                deaths: 0,
                place: 0
            },
            Squad: {
                matches: 0,
                wins: 0,
                kills: 0,
                deaths: 0,
                place: 0
            }
        };

        for (let key in data.stats) {
            stats[data.stats[key].type].kills = parseInt(data.stats[key].kills, 10);
            stats[data.stats[key].type].matches = parseInt(data.stats[key].matches, 10);
            stats[data.stats[key].type].deaths = parseInt(data.stats[key].deaths, 10);
            stats[data.stats[key].type].wins = parseInt(data.stats[key].wins, 10);
            stats[data.stats[key].type].place = parseFloat(data.stats[key].place, 10);

            overall.kills += parseInt(data.stats[key].kills, 10);
            overall.matches += parseInt(data.stats[key].matches, 10);
            overall.deaths += parseInt(data.stats[key].deaths, 10);
            overall.wins += parseInt(data.stats[key].wins, 10);
        }

        this.processHeatmaps(data.matches);

        this.setState({
            matches: data.matches,
            stats: stats,
            overall: overall,
            form: false
        });
    }

    processHeatmaps(data) {
        let sectionPercent = 5;
        let hmData = [];
        let deData = [];
        let sections = 100 / sectionPercent;
        let xSection = 0, ySection = 0;
        let killHeatmap = [], placeHeatmap = [], deathHeatmap = [];
        let killMax = 0, placeMax = 0, deathMax = 0;

        for (let i = 0; i < sections; i++) {
            hmData[i] = [];
            deData[i] = [];
            for (let j = 0; j < sections; j++) {
                hmData[i][j] = {
                    matches: 0,
                    kills: 0,
                    deaths: 0,
                    totalPlace: 0
                };
                deData[i][j] = {
                    matches: 0,
                    kills: 0,
                    deaths: 0,
                    totalPlace: 0
                };
            }
        }

        for (let i = 0; i < data.length; i++) {
            xSection = Math.floor(data[i].drop_x * 100 / sectionPercent);
            ySection = Math.floor(data[i].drop_y * 100 / sectionPercent);

            let place = parseInt(data[i].place, 10);
            if (data[i].type === 'Squad') {
                place = (32 - place) / 32;
            } else if (data[i].type === 'Duo') {
                place = (50 - place) / 50;
            } else {
                place = (100 - place) / 100;
            }

            hmData[xSection][ySection].matches++;
            hmData[xSection][ySection].kills += parseInt(data[i].kills, 10);
            hmData[xSection][ySection].deaths += parseInt(data[i].died, 10);
            hmData[xSection][ySection].totalPlace += place;

            xSection = Math.floor(data[i].end_x * 100 / sectionPercent);
            ySection = Math.floor(data[i].end_y * 100 / sectionPercent);

            deData[xSection][ySection].matches++;
            deData[xSection][ySection].kills += parseInt(data[i].kills, 10);
            deData[xSection][ySection].deaths += parseInt(data[i].died, 10);
            deData[xSection][ySection].totalPlace += place;
        }

        for (let i = 0; i < sections; i++) {
            for (let j = 0; j < sections; j++) {
                if (hmData[i][j].matches > 0) {
                    let kd = hmData[i][j].deaths > 0 ? hmData[i][j].kills / hmData[i][j].deaths : hmData[i][j].kills;
                    let place = hmData[i][j].matches > 0 ? hmData[i][j].totalPlace / hmData[i][j].matches * 5 : 0;
                    killMax = kd > killMax ? kd : killMax;
                    placeMax = place > placeMax ? place : placeMax;
                    killHeatmap.push({
                        x: i * sectionPercent + sectionPercent / 2,
                        y: j * sectionPercent + sectionPercent / 2,
                        value: kd
                    });
                    placeHeatmap.push({
                        x: i * sectionPercent + sectionPercent / 2,
                        y: j * sectionPercent + sectionPercent / 2,
                        value: place
                    });
                }
            }
        }

        for (let i = 0; i < sections; i++) {
            for (let j = 0; j < sections; j++) {
                if (deData[i][j].matches > 0) {
                    deathMax = deData[i][j].deaths > deathMax ? deData[i][j].deaths : deathMax;
                    deathHeatmap.push({
                        x: i * sectionPercent + sectionPercent / 2,
                        y: j * sectionPercent + sectionPercent / 2,
                        value: deData[i][j].deaths
                    });
                }
            }
        }

        this.setState({
            killHeatmap: killHeatmap,
            placeHeatmap: placeHeatmap,
            deathHeatmap: deathHeatmap,
            killMax: killMax,
            placeMax: placeMax,
            deathMax: deathMax
        });
    }

    formatTimeString(timeString) {
        let time = new Date(timeString.replace(/-/g, '/') + ' UTC');
        let unix = time.getTime() / 1000;
        let now = Date.now() / 1000;
        let diff = now - unix;

        let interval = Math.floor(diff / 2592000);
        if (interval > 1) {
            return timeString;
        }

        interval = Math.floor(diff / 86400);
        if (interval > 0) {
            return interval > 1 ? interval + " days ago" : interval + " day ago";
        }

        interval = Math.floor(diff / 3600);
        if (interval > 0) {
            return interval > 1 ? interval + " hours ago" : interval + " hour ago";
        }

        interval = Math.floor(diff / 60);
        if (interval > 0) {
            return interval > 1 ? interval + " minutes ago" : interval + " minute ago";
        }

        return "Now";
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state.match[name] = value;

        this.setState(state);
    }

    trackPosition(e) {
        let match = this.state.match;
        let pos = ReactDOM.findDOMNode(this.image).getBoundingClientRect();
        match[this.state.coords + '_x'] = e.nativeEvent.offsetX / pos.width;
        match[this.state.coords + '_y'] = e.nativeEvent.offsetY / pos.height;

        let next = 'end';
        if (this.state.coords === 'plane_start') {
            next = 'plane_end';
        } else if (this.state.coords === 'plane_end') {
            next = 'drop';
        }

        this.setState({match: match, coords: next});
    }

    getMarkerStyle(match, label) {
        if (!this.image) {
            return {top: -15.0, left: -15.0};
        }
        let pos = ReactDOM.findDOMNode(this.image).getBoundingClientRect();
        return {
            left: match[label + '_x'] * pos.width - 15.0,
            top: match[label + '_y'] * pos.height - 15.0
        }
    }

    getMarkerStyle2(match, label) {
        if (!this.image2) {
            return {top: -15.0, left: -15.0};
        }
        let pos = ReactDOM.findDOMNode(this.image2).getBoundingClientRect();
        return {
            left: parseFloat(match[label + '_x']) * pos.width - 15.0,
            top: parseFloat(match[label + '_y']) * pos.height - 15.0
        }
    }

    updateMatch(field, value) {

        let state = this.state;
        state.match[field] = value;

        this.setState(state);
    }

    addMatch() {
        this.setState({
            match: {
                name: "Xenerius",
                type: "Squad",
                plane_start_x: 0.0,
                plane_start_y: 0.0,
                plane_end_x: 0.0,
                plane_end_y: 0.0,
                drop_x: 0.0,
                drop_y: 0.0,
                place: 0,
                kills: 0,
                died: 1,
                end_x: 0.0,
                end_y: 0.0
            },
            coords: 'plane_start',
            form: true
        });
    }

    submit(event) {
        event.preventDefault();
        fetch('http://api.davisbanks.com/api/fortnite', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.match)
        })
            .then((res) => res.json())
            .then((data) => this.processData(data));
    }

    formatPlace(place) {
        if (place == 1) {
            return '1st';
        } else if (place == 2) {
            return '2nd';
        } else if (place == 3) {
            return '3rd';
        } else {
            return place + 'th';
        }
    }

    render() {
        const {className, content, season, features, width} = this.props;

        const meta = {
            title: 'Davis Banks - Fortnite',
            description: 'I am a software, web, and mobile developer/engineer who works in PHP, HTML, CSS, JS, ReactJS, Flutter, Java, C and more.',
            canonical: 'http://davisbanks.com/blog',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,software,web,mobile,engineer,developer,blog'
                }
            }
        };

        let stats = this.state.stats;

        return (
            <DocumentMeta {...meta}>
                <div className="Fortnite" style={this.state.showMatch === true ? {height: '400px', overflow: 'hidden'} : {}}>
                    <Grid>
                        <Row className="top-bar">
                            <Col sm={3}>
                                <div className="name">Xenerius</div>
                            </Col>
                            <Col sm={2} className="align-right">
                                <div className="stat-label">Matches</div>
                                <div className="stat">{this.state.overall.matches}</div>
                            </Col>
                            <Col sm={2} className="align-right">
                                <div className="stat-label">K/D</div>
                                <div className="stat">{this.state.overall.deaths > 0 ? (this.state.overall.kills / this.state.overall.deaths).toFixed(2) : this.state.overall.kills}</div>
                            </Col>
                            <Col sm={2} className="align-right">
                                <div className="stat-label">Win %</div>
                                <div className="stat">{this.state.overall.matches > 0 ? (this.state.overall.wins / this.state.overall.matches * 100).toFixed(2) : 0.00}%</div>
                            </Col>
                            <Col sm={3} className="align-right">
                                <Button bsStyle="success" onClick={this.addMatch}>Add Match</Button>
                            </Col>
                        </Row>
                    </Grid>
                    <Grid className="stat-boxes">
                        <Row>
                            <Col sm={4}>
                                <div className="stat-box">
                                    <div className="statbox-title solo">Solo</div>
                                    <Grid>
                                        <Row>
                                            <Col xs={6}>Matches</Col>
                                            <Col xs={6} className="align-right">{stats.Solo.matches}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Wins</Col>
                                            <Col xs={6} className="align-right">{stats.Solo.wins}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Win %</Col>
                                            <Col xs={6} className="align-right">{stats.Solo.matches > 0 ? (stats.Solo.wins / stats.Solo.matches * 100).toFixed(2) : 0.00}%</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>K/D</Col>
                                            <Col xs={6} className="align-right">{stats.Solo.deaths > 0 ? (stats.Solo.kills / stats.Solo.deaths).toFixed(2) : stats.Solo.kills}</Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="stat-box">
                                    <div className="statbox-title duo">Duo</div>
                                    <Grid>
                                        <Row>
                                            <Col xs={6}>Matches</Col>
                                            <Col xs={6} className="align-right">{stats.Duo.matches}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Wins</Col>
                                            <Col xs={6} className="align-right">{stats.Duo.wins}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Win %</Col>
                                            <Col xs={6} className="align-right">{stats.Duo.matches > 0 ? (stats.Duo.wins / stats.Duo.matches * 100).toFixed(2) : 0.00}%</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>K/D</Col>
                                            <Col xs={6} className="align-right">{stats.Duo.deaths > 0 ? (stats.Duo.kills / stats.Duo.deaths).toFixed(2) : stats.Duo.kills}</Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="stat-box">
                                    <div className="statbox-title squad">Squad</div>
                                    <Grid>
                                        <Row>
                                            <Col xs={6}>Matches</Col>
                                            <Col xs={6} className="align-right">{stats.Squad.matches}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Wins</Col>
                                            <Col xs={6} className="align-right">{stats.Squad.wins}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Win %</Col>
                                            <Col xs={6} className="align-right">{stats.Squad.matches > 0 ? (stats.Squad.wins / stats.Squad.matches * 100).toFixed(2) : 0.00}%</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>K/D</Col>
                                            <Col xs={6} className="align-right">{stats.Squad.deaths > 0 ? (stats.Squad.kills / stats.Squad.deaths).toFixed(2) : stats.Squad.kills}</Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                    <div className="buttons">
                        <Button onClick={() => this.setState({showHeatmap: 'kill'})}>Drop Kill Heatmap</Button>
                        <Button onClick={() => this.setState({showHeatmap: 'place'})}>Drop Place Heatmap</Button>
                        <Button onClick={() => this.setState({showHeatmap: 'death'})}>Match End Heatmap</Button>
                    </div>
                    <div className="matches">
                        <div className="match-header">
                            <Grid>
                                <Row>
                                    <Col xs={3}>Time</Col>
                                    <Col xs={3}>Type</Col>
                                    <Col xs={2} className="align-right">Died</Col>
                                    <Col xs={2} className="align-right">Kills</Col>
                                    <Col xs={2} className="align-right">Place</Col>
                                </Row>
                            </Grid>
                        </div>
                        {this.state.matches.map(function (match, key) {
                            return <div className="match" key={key} onClick={() => this.setState({selected: match, showMatch: true})}>
                                <Grid>
                                    <Row>
                                        <Col xs={3}>{this.formatTimeString(match.created_at)}</Col>
                                        <Col xs={3}>{match.type}</Col>
                                        <Col xs={2} className="align-right">{match.died}</Col>
                                        <Col xs={2} className="align-right">{match.kills}</Col>
                                        <Col xs={2} className="align-right">{this.formatPlace(match.place)}</Col>
                                    </Row>
                                </Grid>
                            </div>
                        }, this)}
                    </div>
                    {this.state.showHeatmap === 'kill' && <div className="match-form" onClick={() => this.setState({showHeatmap: false})}>
                        <div className="heatmap">
                            <img src="/images/map.png"/>
                            <ReactHeatmap data={this.state.killHeatmap} max={this.state.killMax}/>
                        </div>
                    </div>}
                    {this.state.showHeatmap === 'place' && <div className="match-form" onClick={() => this.setState({showHeatmap: false})}>
                        <div className="heatmap">
                            <img src="/images/map.png"/>
                            <ReactHeatmap max={5} data={this.state.placeHeatmap}/>
                        </div>
                    </div>}
                    {this.state.showHeatmap === 'death' && <div className="match-form" onClick={() => this.setState({showHeatmap: false})}>
                        <div className="heatmap">
                            <img src="/images/map.png"/>
                            <ReactHeatmap max={this.state.deathMax} data={this.state.deathHeatmap}/>
                        </div>
                    </div>}
                    {this.state.form && <div className="match-form" onClick={() => this.setState({form: false})}>
                        <form onSubmit={this.submit} onClick={(e) => e.stopPropagation()}>
                            <Grid>
                                <Row>
                                    <Col sm={6}>
                                        <label htmlFor="name">Name</label>
                                        <input name="name" onChange={this.handleInputChange} value={this.state.match.name}/>
                                    </Col>
                                    <Col sm={6}>
                                        <label htmlFor="type">Game Type</label>
                                        <DropdownButton title={this.state.match.type}>
                                            <MenuItem onClick={() => this.updateMatch('type', 'Solo')}>Solo</MenuItem>
                                            <MenuItem onClick={() => this.updateMatch('type', 'Duo')}>Duo</MenuItem>
                                            <MenuItem onClick={() => this.updateMatch('type', 'Squad')}>Squad</MenuItem>
                                            <MenuItem onClick={() => this.updateMatch('type', 'LTM')}>LTM</MenuItem>
                                        </DropdownButton>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <label htmlFor="kills">Kills</label>
                                        <input name="kills" onChange={this.handleInputChange} value={this.state.match.kills}/>
                                    </Col>

                                    <Col sm={4}>
                                        <label htmlFor="place">Place</label>
                                        <input name="place" onChange={this.handleInputChange} value={this.state.match.place}/>
                                    </Col>
                                    <Col sm={4}>
                                        <label htmlFor="Died">Died</label>
                                        <DropdownButton title={this.state.match.died === 1 ? 'Yes' : 'No'}>
                                            <MenuItem onClick={() => this.updateMatch('died', 1)}>Yes</MenuItem>
                                            <MenuItem onClick={() => this.updateMatch('died', 0)}>No</MenuItem>
                                        </DropdownButton>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <div className="coords">
                                            <ButtonGroup>
                                                <Button onClick={() => this.setState({coords: 'plane_start'})} bsStyle={this.state.coords === 'plane_start' ? 'primary' : 'default'}>Plane
                                                    Start</Button>
                                                <Button onClick={() => this.setState({coords: 'plane_end'})} bsStyle={this.state.coords === 'plane_end' ? 'primary' : 'default'}>Plane End</Button>
                                                <Button onClick={() => this.setState({coords: 'drop'})} bsStyle={this.state.coords === 'drop' ? 'primary' : 'default'}>Drop Location</Button>
                                                <Button onClick={() => this.setState({coords: 'end'})} bsStyle={this.state.coords === 'end' ? 'primary' : 'default'}>End Location</Button>
                                            </ButtonGroup>
                                        </div>
                                        <div ref={image => this.image = image} className="image-coords">
                                            <img src="/images/map.png"/>
                                            <div className="plane_start marker" style={this.getMarkerStyle(this.state.match, 'plane_start')}><FaCircle/></div>
                                            <div className="plane_end marker" style={this.getMarkerStyle(this.state.match, 'plane_end')}><FaBullseye/></div>
                                            <div className="drop marker" style={this.getMarkerStyle(this.state.match, 'drop')}><FaMapPin/></div>
                                            <div className="end marker" style={this.getMarkerStyle(this.state.match, 'end')}><FaClose/></div>
                                            <LineTo from="plane_start" to="plane_end" zIndex={500} within="image-coords" borderColor="#fff" borderWidth={3}/>
                                            <div className="click-space" onClick={this.trackPosition}></div>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>
                            <Button onClick={this.submit} bsStyle="success" className="form-btn">SUBMIT</Button>
                        </form>
                    </div>}
                    <Fade in={this.state.showMatch} onClick={() => this.setState({showMatch: false})}>
                        <div className="match-form">
                            <div className="the-match">
                                <Grid className="match-header">
                                    <Row>
                                        <Col xs={4}>
                                            <div className="match-label">Time</div>
                                            <div className="match-text">{this.state.selected.created_at ? this.formatTimeString(this.state.selected.created_at) : ''}</div>
                                        </Col>
                                        <Col xs={4} className="align-right">
                                            <div className="match-label">Kills</div>
                                            <div className="match-text">{this.state.selected.kills}</div>
                                        </Col>
                                        <Col xs={4} className="align-right">
                                            <div className="match-label">Place</div>
                                            <div className="match-text">{this.formatPlace(this.state.selected.place)}</div>
                                        </Col>
                                    </Row>
                                </Grid>
                                <div className="image-coords2" ref={image2 => this.image2 = image2}>
                                    <img src="/images/map.png"/>
                                    <div className="plane_start2 marker" style={this.getMarkerStyle2(this.state.selected, 'plane_start')}><FaCircle/></div>
                                    <div className="plane_end2 marker" style={this.getMarkerStyle2(this.state.selected, 'plane_end')}><FaBullseye/></div>
                                    <div className="drop marker" style={this.getMarkerStyle2(this.state.selected, 'drop')}><FaMapPin/></div>
                                    <div className="end marker" style={this.getMarkerStyle2(this.state.selected, 'end')}><FaClose/></div>
                                    {this.state.showMatch && <LineTo from="plane_start2" to="plane_end2" zIndex={500} within="image-coords2" borderColor="#fff" borderWidth={3}/>}
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </DocumentMeta>
        )
    }
}

export default Fortnite;
