import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button, DropdownButton, MenuItem, ButtonGroup, Fade} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer} from 'recharts';
import './index.sass';

class FortnitePlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            overall: {
                name: "Loading",
                solo_matches: "0",
                solo_wins: "0",
                solo_kills: "0",
                solo_mmr: "0",
                solo_winrate: "0",
                solo_kd: "0",
                duo_matches: "0",
                duo_wins: "0",
                duo_kills: "0",
                duo_mmr: "0",
                duo_winrate: "0",
                duo_kd: "0",
                squad_matches: "0",
                squad_wins: "0",
                squad_kills: "0",
                squad_mmr: "0",
                squad_winrate: "0",
                squad_kd: "0",
            },
            last24: {
                solo_matches: "0",
                solo_wins: "0",
                solo_kills: "0",
                solo_mmr: "0",
                solo_winrate: "0",
                solo_kd: "0",
                duo_matches: "0",
                duo_wins: "0",
                duo_kills: "0",
                duo_mmr: "0",
                duo_winrate: "0",
                duo_kd: "0",
                squad_matches: "0",
                squad_wins: "0",
                squad_kills: "0",
                squad_mmr: "0",
                squad_winrate: "0",
                squad_kd: "0",
            },
            lastWeek: {
                solo_matches: "0",
                solo_wins: "0",
                solo_kills: "0",
                solo_mmr: "0",
                solo_winrate: "0",
                solo_kd: "0",
                duo_matches: "0",
                duo_wins: "0",
                duo_kills: "0",
                duo_mmr: "0",
                duo_winrate: "0",
                duo_kd: "0",
                squad_matches: "0",
                squad_wins: "0",
                squad_kills: "0",
                squad_mmr: "0",
                squad_winrate: "0",
                squad_kd: "0",
            },
            charting: [],
            showing: false
        };

        fetch('http://api.davisbanks.com/api/stats/' + props.params.name)
            .then((res) => res.json())
            .then((data) => this.processData(data));

        this.processData = this.processData.bind(this);
    }

    processData(data) {

        let charting = [];

        for (let key in data.charting) {
            let date = new Date(data.charting[key].created_at.replace(/-/g, '/') + ' UTC');
            charting.push({
                date: ('0' + date.getMonth().toString()).slice(-2) + '/' + ('0' + date.getDate().toString()).slice(-2) + ' ' + ('0' + date.getHours().toString()).slice(-2) + ':00',
                solo_kd: data.charting[key].solo_kd == "0.000" ? null : parseFloat(data.charting[key].solo_kd),
                duo_kd: data.charting[key].duo_kd == "0.000" ? null : parseFloat(data.charting[key].duo_kd),
                squad_kd: data.charting[key].squad_kd == "0.000" ? null : parseFloat(data.charting[key].squad_kd),
                solo_winrate: data.charting[key].solo_winrate == "0.000" ? null : parseFloat(data.charting[key].solo_winrate) * 100,
                duo_winrate: data.charting[key].duo_winrate == "0.000" ? null : parseFloat(data.charting[key].duo_winrate) * 100,
                squad_winrate: data.charting[key].squad_winrate == "0.000" ? null : parseFloat(data.charting[key].squad_winrate) * 100,
            })
        }

        this.setState({
            overall: data.overall,
            last24: data.last24[0],
            lastWeek: data.lastWeek[0],
            charting: charting
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

    render() {
        const {className, content, season, features, width} = this.props;

        const meta = {
            title: 'Davis Banks - ' + this.props.params.name + ' Fortnite Stats',
            description: 'I am a software, web, and mobile developer/engineer who works in PHP, HTML, CSS, JS, ReactJS, Flutter, Java, C and more.',
            canonical: 'http://davisbanks.com/blog',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,software,web,mobile,engineer,developer,blog'
                }
            }
        };

        let overall = this.state.overall;

        let matches = parseInt(this.state.overall.solo_matches, 10) + parseInt(this.state.overall.duo_matches, 10) + parseInt(this.state.overall.squad_matches, 10);
        let kills = parseInt(this.state.overall.solo_kills, 10) + parseInt(this.state.overall.duo_kills, 10) + parseInt(this.state.overall.squad_kills, 10);
        let wins = parseInt(this.state.overall.solo_wins, 10) + parseInt(this.state.overall.duo_wins, 10) + parseInt(this.state.overall.squad_wins, 10);

        let last24Matches = parseInt(this.state.last24.solo_matches, 10) + parseInt(this.state.last24.duo_matches, 10) + parseInt(this.state.last24.squad_matches, 10);
        let last24Kills = parseInt(this.state.last24.solo_kills, 10) + parseInt(this.state.last24.duo_kills, 10) + parseInt(this.state.last24.squad_kills, 10);
        let last24Wins = parseInt(this.state.last24.solo_wins, 10) + parseInt(this.state.last24.duo_wins, 10) + parseInt(this.state.last24.squad_wins, 10);

        let lastWeekMatches = parseInt(this.state.lastWeek.solo_matches, 10) + parseInt(this.state.lastWeek.duo_matches, 10) + parseInt(this.state.lastWeek.squad_matches, 10);
        let lastWeekKills = parseInt(this.state.lastWeek.solo_kills, 10) + parseInt(this.state.lastWeek.duo_kills, 10) + parseInt(this.state.lastWeek.squad_kills, 10);
        let lastWeekWins = parseInt(this.state.lastWeek.solo_wins, 10) + parseInt(this.state.lastWeek.duo_wins, 10) + parseInt(this.state.lastWeek.squad_wins, 10);

        return (
            <DocumentMeta {...meta}>
                <div className="Fortnite player">
                    <Grid>
                        <Row className="top-bar">
                            <Col sm={3}>
                                <div className="name">{this.props.params.name}</div>
                            </Col>
                            <Col sm={3} className="align-right">
                                <div className="stat-label">Matches</div>
                                <div className="stat">{matches}</div>
                            </Col>
                            <Col sm={3} className="align-right">
                                <div className="stat-label">K/D</div>
                                <div className="stat">{matches > 0 ? (kills / matches).toFixed(2) : kills}</div>
                            </Col>
                            <Col sm={3} className="align-right">
                                <div className="stat-label">Win %</div>
                                <div className="stat">{matches > 0 ? (wins / matches * 100).toFixed(2) : 0.00}%</div>
                            </Col>
                        </Row>
                    </Grid>
                    <Grid className="stat-boxes">
                        <Row>
                            <Col sm={4}>
                                <div className={"stat-box player-boxes " + (this.state.showing === 'overall' ? 'active' : '')}
                                     onClick={() => this.setState({showing: this.state.showing === 'overall' ? false : 'overall'})}>
                                    <div className="statbox-title solo">All Time</div>
                                    <Grid>
                                        <Row>
                                            <Col xs={6}>Matches</Col>
                                            <Col xs={6} className="align-right">{matches}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Wins</Col>
                                            <Col xs={6} className="align-right">{wins}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Win %</Col>
                                            <Col xs={6} className="align-right">{matches > 0 ? (wins / matches * 100).toFixed(2) : 0.00}%</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>K/D</Col>
                                            <Col xs={6} className="align-right">{matches > 0 ? (kills / matches).toFixed(2) : kills}</Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className={"stat-box player-boxes " + (this.state.showing === 'lastWeek' ? 'active' : '')}
                                     onClick={() => this.setState({showing: this.state.showing === 'lastWeek' ? false : 'lastWeek'})}>
                                    <div className="statbox-title duo">Last Week</div>
                                    <Grid>
                                        <Row>
                                            <Col xs={6}>Matches</Col>
                                            <Col xs={6} className="align-right">{lastWeekMatches}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Wins</Col>
                                            <Col xs={6} className="align-right">{lastWeekWins}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Win %</Col>
                                            <Col xs={6} className="align-right">{lastWeekMatches > 0 ? (lastWeekWins / lastWeekMatches * 100).toFixed(2) : 0.00}%</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>K/D</Col>
                                            <Col xs={6} className="align-right">{lastWeekMatches > 0 ? (lastWeekKills / lastWeekMatches).toFixed(2) : lastWeekKills}</Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className={"stat-box player-boxes " + (this.state.showing === 'last24' ? 'active' : '')}
                                     onClick={() => this.setState({showing: this.state.showing === 'last24' ? false : 'last24'})}>
                                    <div className="statbox-title squad">Last 24 Hours</div>
                                    <Grid>
                                        <Row>
                                            <Col xs={6}>Matches</Col>
                                            <Col xs={6} className="align-right">{last24Matches}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Wins</Col>
                                            <Col xs={6} className="align-right">{last24Wins}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>Win %</Col>
                                            <Col xs={6} className="align-right">{last24Matches > 0 ? (last24Wins / last24Matches * 100).toFixed(2) : 0.00}%</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>K/D</Col>
                                            <Col xs={6} className="align-right">{last24Matches > 0 ? (last24Kills / last24Matches).toFixed(2) : last24Kills}</Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                        </Row>
                        {this.state.showing !== false && <Fade in={this.state.showing !== false}>
                            <Row className="showing">
                                <Col sm={4}>
                                    <div className="stat-box">
                                        <div className="statbox-title solo">Solo</div>
                                        <Grid>
                                            <Row>
                                                <Col xs={6}>Matches</Col>
                                                <Col xs={6} className="align-right">{this.state[this.state.showing].solo_matches}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>Wins</Col>
                                                <Col xs={6} className="align-right">{this.state[this.state.showing].solo_wins}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>Win %</Col>
                                                <Col xs={6}
                                                     className="align-right">{this.state[this.state.showing].solo_matches > 0 ? (this.state[this.state.showing].solo_wins / this.state[this.state.showing].solo_matches * 100).toFixed(2) : 0.00}%</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>K/D</Col>
                                                <Col xs={6}
                                                     className="align-right">{this.state[this.state.showing].solo_matches > 0 ? (this.state[this.state.showing].solo_kills / this.state[this.state.showing].solo_matches).toFixed(2) : this.state[this.state.showing].solo_kills}</Col>
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
                                                <Col xs={6} className="align-right">{this.state[this.state.showing].duo_matches}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>Wins</Col>
                                                <Col xs={6} className="align-right">{this.state[this.state.showing].duo_wins}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>Win %</Col>
                                                <Col xs={6}
                                                     className="align-right">{this.state[this.state.showing].duo_matches > 0 ? (this.state[this.state.showing].duo_wins / this.state[this.state.showing].duo_matches * 100).toFixed(2) : 0.00}%</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>K/D</Col>
                                                <Col xs={6}
                                                     className="align-right">{this.state[this.state.showing].duo_matches > 0 ? (this.state[this.state.showing].duo_kills / this.state[this.state.showing].duo_matches).toFixed(2) : this.state[this.state.showing].duo_kills}</Col>
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
                                                <Col xs={6} className="align-right">{this.state[this.state.showing].squad_matches}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>Wins</Col>
                                                <Col xs={6} className="align-right">{this.state[this.state.showing].squad_wins}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>Win %</Col>
                                                <Col xs={6}
                                                     className="align-right">{this.state[this.state.showing].squad_matches > 0 ? (this.state[this.state.showing].squad_wins / this.state[this.state.showing].squad_matches * 100).toFixed(2) : 0.00}%</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>K/D</Col>
                                                <Col xs={6}
                                                     className="align-right">{this.state[this.state.showing].squad_matches > 0 ? (this.state[this.state.showing].squad_kills / this.state[this.state.showing].squad_matches).toFixed(2) : this.state[this.state.showing].squad_kills}</Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                </Col>
                            </Row>
                        </Fade>}
                        <Row className="charts">
                            <Col sm={6}>
                                <ResponsiveContainer>
                                    <LineChart data={this.state.charting}>
                                        <XAxis dataKey="date"/>
                                        <YAxis/>
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Tooltip formatter={(value) => value.toFixed(2)}/>
                                        <Line type="monotone" dataKey="solo_kd" stroke="#d9534f"/>
                                        <Line type="monotone" dataKey="duo_kd" stroke="#1b6d85"/>
                                        <Line type="monotone" dataKey="squad_kd" stroke="#4cae4c"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </Col>
                            <Col sm={6}>
                                <ResponsiveContainer>
                                    <LineChart data={this.state.charting}>
                                        <XAxis dataKey="date"/>
                                        <YAxis/>
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Tooltip formatter={(value) => value.toFixed(2)}/>
                                        <Line type="monotone" dataKey="solo_winrate" stroke="#d9534f"/>
                                        <Line type="monotone" dataKey="duo_winrate" stroke="#1b6d85"/>
                                        <Line type="monotone" dataKey="squad_winrate" stroke="#4cae4c"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </DocumentMeta>
        )
    }
}

export default FortnitePlayer;