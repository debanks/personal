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
            showMatch: false,
            selected: {},
            match: {},
            coords: 'plane_start',
            form: false
        };

        fetch('http://api.davisbanks.com/api/fortnite')
            .then((res) => res.json())
            .then((data) => {

                let overall = {
                    matches: 0,
                    wins: 0,
                    kills: 0,
                    deaths: 0
                };
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

                this.setState({
                    matches: data.matches,
                    stats: stats,
                    overall: overall
                });
            });

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.addMatch = this.addMatch.bind(this);
        this.trackPosition = this.trackPosition.bind(this);
        this.getMarkerStyle = this.getMarkerStyle.bind(this);
        this.getMarkerStyle2 = this.getMarkerStyle2.bind(this);
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
        this.setState({match: match});
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
            .then((data) => {
                this.setState({
                    matches: data.matches,
                    stats: data.stats,
                    form: false
                });
            });
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
                <div className="Fortnite">
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
                    <div className="matches">
                        <div className="match-header">
                            <Grid>
                                <Row>
                                    <Col xs={3}>Time</Col>
                                    <Col xs={3}>Type</Col>
                                    <Col xs={2} className="align-right">Place</Col>
                                    <Col xs={2} className="align-right">Kills</Col>
                                    <Col xs={2} className="align-right">Died</Col>
                                </Row>
                            </Grid>
                        </div>
                        {this.state.matches.map(function (match, key) {
                            return <div className="match" key={key} onClick={() => this.setState({selected: match, showMatch: true})}>
                                <Grid>
                                    <Row>
                                        <Col xs={3}>{this.formatTimeString(match.created_at)}</Col>
                                        <Col xs={3}>{match.type}</Col>
                                        <Col xs={2} className="align-right">{match.place}</Col>
                                        <Col xs={2} className="align-right">{match.kills}</Col>
                                        <Col xs={2} className="align-right">{match.died}</Col>
                                    </Row>
                                </Grid>
                            </div>
                        }, this)}
                    </div>
                    {this.state.form && <div className="match-form">
                        <form onSubmit={this.submit}>
                            <Grid>
                                <Row>
                                    <Col sm={6}>
                                        <label htmlFor="name">Name</label>
                                        <input name="name" onChange={this.handleInputChange} value={this.state.match.name}/>
                                    </Col>
                                    <Col sm={6}>
                                        <label htmlFor="type">Game Type</label>
                                        <DropdownButton title={this.state.match.type}>
                                            <MenuItem onClick={() => this.setState({type: 'Solo'})}>Solo</MenuItem>
                                            <MenuItem onClick={() => this.setState({type: 'Duo'})}>Duo</MenuItem>
                                            <MenuItem onClick={() => this.setState({type: 'Squad'})}>Squad</MenuItem>
                                            <MenuItem onClick={() => this.setState({type: 'LTM'})}>LTM</MenuItem>
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
                                            <MenuItem onClick={() => {
                                                let match = this.state.match;
                                                match.died = 1;
                                                this.setState({match: match})
                                            }}>Yes</MenuItem>
                                            <MenuItem onClick={() => {
                                                let match = this.state.match;
                                                match.died = 0;
                                                this.setState({match: match})
                                            }}>No</MenuItem>
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
                                        <div ref={image => this.image = image} className="image-coords" onClick={this.trackPosition}>
                                            <img src="/images/map.png"/>
                                            <div className="plane_start marker" style={this.getMarkerStyle(this.state.match, 'plane_start')}><FaCircle/></div>
                                            <div className="plane_end marker" style={this.getMarkerStyle(this.state.match, 'plane_end')}><FaBullseye/></div>
                                            <div className="drop marker" style={this.getMarkerStyle(this.state.match, 'drop')}><FaMapPin/></div>
                                            <div className="end marker" style={this.getMarkerStyle(this.state.match, 'end')}><FaClose/></div>
                                            <LineTo from="plane_start" to="plane_end" zIndex={500} within="image-coords" borderColor="#fff" borderWidth={3}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>
                            <Button onClick={this.submit} bsStyle="success" className="form-btn">Submit</Button>
                        </form>
                    </div>}
                    <Fade in={this.state.showMatch} onClick={() => this.setState({showMatch: false})}>
                        <div className="match-form">
                            <div className="the-match">
                                <div className="image-coords2" ref={image2 => this.image2 = image2}>
                                    <img src="/images/map.png"/>
                                    <div className="plane_start2 marker" style={this.getMarkerStyle2(this.state.selected, 'plane_start')}><FaCircle/></div>
                                    <div className="plane_end2 marker" style={this.getMarkerStyle2(this.state.selected, 'plane_end')}><FaBullseye/></div>
                                    <div className="drop marker" style={this.getMarkerStyle2(this.state.selected, 'drop')}><FaMapPin/></div>
                                    <div className="end marker" style={this.getMarkerStyle2(this.state.selected, 'end')}><FaClose/></div>
                                    <LineTo from="plane_start2" to="plane_end2" zIndex={500} within="image-coords2" borderColor="#fff" borderWidth={3}/>
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