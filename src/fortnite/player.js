import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button, DropdownButton, MenuItem, ButtonGroup, Fade} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import FaCaretLeft from 'react-icons/lib/fa/angle-left';
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
                solo_rank: "",
                solo_rank_image: "",
                duo_rank: "",
                duo_rank_image: "",
                squad_rank: "",
                squad_rank_image: ""
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
            chartType: "kd",
            showing: false
        };

        fetch('http://api.davisbanks.com/api/stats/' + props.params.name)
            .then((res) => res.json())
            .then((data) => this.processData(data));

        this.processData = this.processData.bind(this);
    }

    processData(data) {

        let charting = [];
        let mmrStart = {
            solo_mmr: parseFloat(data.overall.solo_mmr),
            duo_mmr: parseFloat(data.overall.duo_mmr),
            squad_mmr: parseFloat(data.overall.squad_mmr)
        };

        for (let i = data.charting.length - 1; i >= 0; i--) {
            mmrStart.solo_mmr -= parseFloat(data.charting[i].solo_mmr);
            mmrStart.duo_mmr -= parseFloat(data.charting[i].duo_mmr);
            mmrStart.squad_mmr -= parseFloat(data.charting[i].squad_mmr);
        }

        for (let key in data.charting) {
            let date = new Date(data.charting[key].created_at.replace(/-/g, '/') + ' UTC');

            mmrStart.solo_mmr += parseFloat(data.charting[key].solo_mmr);
            mmrStart.duo_mmr += parseFloat(data.charting[key].duo_mmr);
            mmrStart.squad_mmr += parseFloat(data.charting[key].squad_mmr);

            charting.push({
                date: ('0' + date.getMonth().toString()).slice(-2) + '/' + ('0' + date.getDate().toString()).slice(-2) + ' ' + ('0' + date.getHours().toString()).slice(-2) + ':00',
                solo_kd: data.charting[key].solo_kd == "0.000" ? null : parseFloat(data.charting[key].solo_kd),
                duo_kd: data.charting[key].duo_kd == "0.000" ? null : parseFloat(data.charting[key].duo_kd),
                squad_kd: data.charting[key].squad_kd == "0.000" ? null : parseFloat(data.charting[key].squad_kd),
                solo_winrate: data.charting[key].solo_winrate == "0.000" ? null : parseFloat(data.charting[key].solo_winrate) * 100,
                duo_winrate: data.charting[key].duo_winrate == "0.000" ? null : parseFloat(data.charting[key].duo_winrate) * 100,
                squad_winrate: data.charting[key].squad_winrate == "0.000" ? null : parseFloat(data.charting[key].squad_winrate) * 100,
                solo_mmr: mmrStart.solo_mmr,
                duo_mmr: mmrStart.duo_mmr,
                squad_mmr: mmrStart.squad_mmr,
                solo_mmr_diff: parseFloat(data.charting[key].solo_mmr),
                duo_mmr_diff: parseFloat(data.charting[key].duo_mmr),
                squad_mmr_diff: parseFloat(data.charting[key].squad_mmr)
            })
        }

        this.setState({
            overall: data.overall,
            last24: data.last24[0],
            lastWeek: data.lastWeek[0],
            charting: charting
        });
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

        let matches = parseInt(this.state.overall.solo_matches, 10) + parseInt(this.state.overall.duo_matches, 10) + parseInt(this.state.overall.squad_matches, 10);
        let kills = parseInt(this.state.overall.solo_kills, 10) + parseInt(this.state.overall.duo_kills, 10) + parseInt(this.state.overall.squad_kills, 10);
        let wins = parseInt(this.state.overall.solo_wins, 10) + parseInt(this.state.overall.duo_wins, 10) + parseInt(this.state.overall.squad_wins, 10);

        return (
            <DocumentMeta {...meta}>
                <div className="Fortnite player">
                    <Grid>
                        <Row className="top-bar">
                            <Col sm={3}>
                                <div className="name">
                                    <a href="/fortnite-stats" className="back-arrow"><FaCaretLeft/></a>
                                    {this.props.params.name}
                                </div>
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
                                <div className="rank-box">
                                    <div className="rank-class">SOLO</div>
                                    <Grid>
                                        <Row>
                                            <Col sm={6} className="align-center">
                                                <img src={"/images/ranks/" + this.state.overall.solo_rank_image}/>
                                                <div className="rank-name">{this.state.overall.solo_rank.toUpperCase()}</div>
                                            </Col>
                                            <Col sm={6} className="align-right">
                                                <div className="rank-label">Matches</div>
                                                <div className="rank-stat">{this.state.overall.solo_matches}</div>
                                                <div className="rank-label">K/D</div>
                                                <div
                                                    className="rank-stat">{parseInt(this.state.overall.solo_matches, 10) > 0 ? (parseInt(this.state.overall.solo_kills, 10) / parseInt(this.state.overall.solo_matches, 10)).toFixed(2) : 0.00}</div>
                                                <div className="rank-label">Win %</div>
                                                <div
                                                    className="rank-stat">{parseInt(this.state.overall.solo_matches, 10) > 0 ? (parseInt(this.state.overall.solo_wins, 10) / parseInt(this.state.overall.solo_matches, 10) * 100).toFixed(2) : 0.00}%
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                            <Col sm={4}>

                                <div className="rank-box">
                                    <div className="rank-class">DUO</div>
                                    <Grid>
                                        <Row>
                                            <Col sm={6} className="align-center">
                                                <img src={"/images/ranks/" + this.state.overall.duo_rank_image}/>
                                                <div className="rank-name">{this.state.overall.duo_rank.toUpperCase()}</div>
                                            </Col>
                                            <Col sm={6} className="align-right">
                                                <div className="rank-label">Matches</div>
                                                <div className="rank-stat">{this.state.overall.duo_matches}</div>
                                                <div className="rank-label">K/D</div>
                                                <div
                                                    className="rank-stat">{parseInt(this.state.overall.duo_matches, 10) > 0 ? (parseInt(this.state.overall.duo_kills, 10) / parseInt(this.state.overall.duo_matches, 10)).toFixed(2) : 0.00}</div>
                                                <div className="rank-label">Win %</div>
                                                <div
                                                    className="rank-stat">{parseInt(this.state.overall.duo_matches, 10) > 0 ? (parseInt(this.state.overall.duo_wins, 10) / parseInt(this.state.overall.duo_matches, 10) * 100).toFixed(2) : 0.00}%
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                            <Col sm={4}>

                                <div className="rank-box">
                                    <div className="rank-class">SQUAD</div>
                                    <Grid>
                                        <Row>
                                            <Col sm={6} className="align-center">
                                                <img src={"/images/ranks/" + this.state.overall.squad_rank_image}/>
                                                <div className="rank-name">{this.state.overall.squad_rank.toUpperCase()}</div>
                                            </Col>
                                            <Col sm={6} className="align-right">
                                                <div className="rank-label">Matches</div>
                                                <div className="rank-stat">{this.state.overall.squad_matches}</div>
                                                <div className="rank-label">K/D</div>
                                                <div
                                                    className="rank-stat">{parseInt(this.state.overall.squad_matches, 10) > 0 ? (parseInt(this.state.overall.squad_kills, 10) / parseInt(this.state.overall.squad_matches, 10)).toFixed(2) : 0.00}</div>
                                                <div className="rank-label">Win %</div>
                                                <div
                                                    className="rank-stat">{parseInt(this.state.overall.squad_matches, 10) > 0 ? (parseInt(this.state.overall.squad_wins, 10) / parseInt(this.state.overall.squad_matches, 10) * 100).toFixed(2) : 0.00}%
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{"marginTop": "20px"}}>
                            <Col sm={6}>
                                <div className="recent">
                                    <div className="recent-title">
                                        <div className="recent-content">Last 24 Hours</div>
                                    </div>
                                    <Grid className="recent-stats">
                                        <Row>
                                            <Col sm={3}>
                                                <div className="recent-full">Solo</div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">MMR</div>
                                                <div className={"recent-stat " + (this.state.last24.solo_mmr > 0 ? 'positive' : 'negative')}>
                                                    {parseFloat(this.state.last24.solo_mmr) > 0 ? '+' : ''}{this.state.last24.solo_mmr}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">K/D</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.last24.solo_matches, 10) > 0 ? (parseInt(this.state.last24.solo_kills, 10) / parseInt(this.state.last24.solo_matches, 10)).toFixed(2) : '0.00'}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">Win %</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.last24.solo_matches, 10) > 0 ? (parseInt(this.state.last24.solo_wins, 10) / parseInt(this.state.last24.solo_matches, 10) * 100).toFixed(2) : '0.00'}%
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={3}>
                                                <div className="recent-full">Duo</div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">MMR</div>
                                                <div className={"recent-stat " + (this.state.last24.duo_mmr > 0 ? 'positive' : 'negative')}>
                                                    {parseFloat(this.state.last24.duo_mmr) > 0 ? '+' : ''}{this.state.last24.duo_mmr}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">K/D</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.last24.duo_matches, 10) > 0 ? (parseInt(this.state.last24.duo_kills, 10) / parseInt(this.state.last24.duo_matches, 10)).toFixed(2) : '0.00'}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">Win %</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.last24.duo_matches, 10) > 0 ? (parseInt(this.state.last24.duo_wins, 10) / parseInt(this.state.last24.duo_matches, 10) * 100).toFixed(2) : '0.00'}%
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={3}>
                                                <div className="recent-full">Squad</div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">MMR</div>
                                                <div className={"recent-stat " + (this.state.last24.squad_mmr > 0 ? 'positive' : 'negative')}>
                                                    {parseFloat(this.state.last24.squad_mmr) > 0 ? '+' : ''}{this.state.last24.squad_mmr}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">K/D</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.last24.squad_matches, 10) > 0 ? (parseInt(this.state.last24.squad_kills, 10) / parseInt(this.state.last24.squad_matches, 10)).toFixed(2) : '0.00'}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">Win %</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.last24.squad_matches, 10) > 0 ? (parseInt(this.state.last24.squad_wins, 10) / parseInt(this.state.last24.squad_matches, 10) * 100).toFixed(2) : '0.00'}%
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="recent">
                                    <div className="recent-title">
                                        <div className="recent-content">Last Week</div>
                                    </div>
                                    <Grid className="recent-stats">
                                        <Row>
                                            <Col sm={3}>
                                                <div className="recent-full">Solo</div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">MMR</div>
                                                <div className={"recent-stat " + (this.state.lastWeek.solo_mmr > 0 ? 'positive' : 'negative')}>
                                                    {parseFloat(this.state.lastWeek.solo_mmr) > 0 ? '+' : ''}{this.state.lastWeek.solo_mmr}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">K/D</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.lastWeek.solo_matches, 10) > 0 ? (parseInt(this.state.lastWeek.solo_kills, 10) / parseInt(this.state.lastWeek.solo_matches, 10)).toFixed(2) : '0.00'}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">Win %</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.lastWeek.solo_matches, 10) > 0 ? (parseInt(this.state.lastWeek.solo_wins, 10) / parseInt(this.state.lastWeek.solo_matches, 10) * 100).toFixed(2) : '0.00'}%
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={3}>
                                                <div className="recent-full">Duo</div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">MMR</div>
                                                <div className={"recent-stat " + (this.state.lastWeek.duo_mmr > 0 ? 'positive' : 'negative')}>
                                                    {parseFloat(this.state.lastWeek.duo_mmr) > 0 ? '+' : ''}{this.state.lastWeek.duo_mmr}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">K/D</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.lastWeek.duo_matches, 10) > 0 ? (parseInt(this.state.lastWeek.duo_kills, 10) / parseInt(this.state.lastWeek.duo_matches, 10)).toFixed(2) : '0.00'}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">Win %</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.lastWeek.duo_matches, 10) > 0 ? (parseInt(this.state.lastWeek.duo_wins, 10) / parseInt(this.state.lastWeek.duo_matches, 10) * 100).toFixed(2) : '0.00'}%
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={3}>
                                                <div className="recent-full">Squad</div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">MMR</div>
                                                <div className={"recent-stat " + (this.state.lastWeek.squad_mmr > 0 ? 'positive' : 'negative')}>
                                                    {parseFloat(this.state.lastWeek.squad_mmr) > 0 ? '+' : ''}{this.state.lastWeek.squad_mmr}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">K/D</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.lastWeek.squad_matches, 10) > 0 ? (parseInt(this.state.lastWeek.squad_kills, 10) / parseInt(this.state.lastWeek.squad_matches, 10)).toFixed(2) : '0.00'}
                                                </div>
                                            </Col>
                                            <Col sm={3} className="align-right">
                                                <div className="recent-label">Win %</div>
                                                <div className="recent-stat">
                                                    {parseInt(this.state.lastWeek.squad_matches, 10) > 0 ? (parseInt(this.state.lastWeek.squad_wins, 10) / parseInt(this.state.lastWeek.squad_matches, 10) * 100).toFixed(2) : '0.00'}%
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </Col>
                        </Row>
                        <Row className="charts">
                            <Col sm={12}>
                                <div className="chart-cont">
                                    <div className="chart-options">
                                        <div className={"slant " + (this.state.chartType === 'kd' ? "active" : "")} onClick={() => this.setState({chartType: 'kd'})}>
                                            <div className="slant-content">K/D</div>
                                        </div>
                                        <div className={"slant " + (this.state.chartType === 'mmr' ? "active" : "")} onClick={() => this.setState({chartType: 'mmr'})}>
                                            <div className="slant-content">MMR</div>
                                        </div>
                                        <div className={"slant " + (this.state.chartType === 'mmr_diff' ? "active" : "")} onClick={() => this.setState({chartType: 'mmr_diff'})}>
                                            <div className="slant-content">MMR Diff</div>
                                        </div>
                                    </div>
                                    <div className="chart-container">
                                        <ResponsiveContainer>
                                            <LineChart data={this.state.charting}>
                                                <XAxis dataKey="date"/>
                                                <YAxis domain={['dataMin', 'dataMax']} tickFormatter={(value) => value.toFixed(2)}/>
                                                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                                <Tooltip formatter={(value) => value.toFixed(2)}/>
                                                {this.state.chartType === 'kd' && <Line type="monotone" dataKey="solo_kd" stroke="#d9534f" strokeWidth={3}/>}
                                                {this.state.chartType === 'kd' && <Line type="monotone" dataKey="duo_kd" stroke="#5badd5" strokeWidth={3}/>}
                                                {this.state.chartType === 'kd' && <Line type="monotone" dataKey="squad_kd" stroke="#4cae4c" strokeWidth={3}/>}
                                                {this.state.chartType === 'mmr' && <Line type="monotone" dataKey="solo_mmr" stroke="#d9534f" strokeWidth={3}/>}
                                                {this.state.chartType === 'mmr' && <Line type="monotone" dataKey="duo_mmr" stroke="#5badd5" strokeWidth={3}/>}
                                                {this.state.chartType === 'mmr' && <Line type="monotone" dataKey="squad_mmr" stroke="#4cae4c" strokeWidth={3}/>}
                                                {this.state.chartType === 'mmr_diff' && <Line type="monotone" dataKey="solo_mmr_diff" stroke="#d9534f" strokeWidth={3}/>}
                                                {this.state.chartType === 'mmr_diff' && <Line type="monotone" dataKey="duo_mmr_diff" stroke="#5badd5" strokeWidth={3}/>}
                                                {this.state.chartType === 'mmr_diff' && <Line type="monotone" dataKey="squad_mmr_diff" stroke="#4cae4c" strokeWidth={3}/>}
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </DocumentMeta>
        )
    }
}

export default FortnitePlayer;
