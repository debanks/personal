import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button, DropdownButton, MenuItem, ButtonGroup, Fade} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';
import FaBullseye from 'react-icons/lib/fa/bullseye';
import FaMapPin from 'react-icons/lib/fa/map-marker';
import FaClose from 'react-icons/lib/fa/close';
import FaArrow from 'react-icons/lib/fa/arrow-left';
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
                                            <div className="title-container">
                                                <div className="player-name">
                                                    <div className="player-content">{player.name}</div>
                                                </div>
                                            </div>
                                            <Grid>
                                                <Row>
                                                    <Col xs={4}>
                                                        <div className="rank-container">
                                                            <img src={"/images/ranks/" + player.solo_rank_image}/>
                                                            <div className="fn-label">SOLO</div>
                                                            <div className={"fn-diff " + (parseFloat(player.recent_solo_mmr) > 0 ? 'green' : 'red')}>
                                                                {parseFloat(player.recent_solo_mmr) > 0 ? '+' : ''}{parseFloat(player.recent_solo_mmr)}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <div className="rank-container">
                                                            <img src={"/images/ranks/" + player.duo_rank_image}/>
                                                            <div className="fn-label">DUO</div>
                                                            <div className={"fn-diff " + (parseFloat(player.recent_duo_mmr) > 0 ? 'green' : 'red')}>
                                                                {parseFloat(player.recent_duo_mmr) > 0 ? '+' : ''}{parseFloat(player.recent_duo_mmr)}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <div className="rank-container">
                                                            <img src={"/images/ranks/" + player.squad_rank_image}/>
                                                            <div className="fn-label">SQUAD</div>
                                                            <div className={"fn-diff " + (parseFloat(player.recent_squad_mmr) > 0 ? 'green' : 'red')}>
                                                                {parseFloat(player.recent_squad_mmr) > 0 ? '+' : ''}{parseFloat(player.recent_squad_mmr)}
                                                            </div>
                                                        </div>
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
