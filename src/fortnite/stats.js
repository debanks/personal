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

class FortniteStats extends Component {

    constructor(props) {
        super(props);

        this.state = {
            players: []
        };

        fetch('http://api.davisbanks.com/api/stats')
            .then((res) => res.json())
            .then((data) => this.processData(data));

        this.processData = this.processData.bind(this);
    }

    processData(data) {

        this.setState({
            players: data.players
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
                <div className="FortniteStats">

                    <Grid className="players">
                        <Row>
                            {this.state.players.map(function (player, key) {
                                return <Col md={4}>
                                    <a key={key} href={"/fortnite-stats/" + player.name}>
                                        <div className="player">
                                            <div className="player-name">{player.name}</div>
                                            <Grid>
                                                <Row>
                                                    <Col xs={6}>
                                                        <div className="fn-label">Solo Win %</div>
                                                        <div className="fn-stat">{(parseFloat(player.solo_winrate) * 100).toFixed(2)}%</div>
                                                    </Col>
                                                    <Col xs={6} className="align-right">
                                                        <div className="fn-label">Solo KD</div>
                                                        <div className="fn-stat">{parseFloat(player.solo_kd).toFixed(2)}</div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={6}>
                                                        <div className="fn-label">Duo Win %</div>
                                                        <div className="fn-stat">{(parseFloat(player.duo_winrate) * 100).toFixed(2)}%</div>
                                                    </Col>
                                                    <Col xs={6} className="align-right">
                                                        <div className="fn-label">Duo KD</div>
                                                        <div className="fn-stat">{parseFloat(player.duo_kd).toFixed(2)}</div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={6}>
                                                        <div className="fn-label">Squad Win %</div>
                                                        <div className="fn-stat">{(parseFloat(player.squad_winrate) * 100).toFixed(2)}%</div>
                                                    </Col>
                                                    <Col xs={6} className="align-right">
                                                        <div className="fn-label">Squad KD</div>
                                                        <div className="fn-stat">{parseFloat(player.squad_kd).toFixed(2)}</div>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </a>
                                </Col>
                            }, this)}
                        </Row>
                    </Grid>
                </div>
            </DocumentMeta>
        )
    }
}

export default FortniteStats;
