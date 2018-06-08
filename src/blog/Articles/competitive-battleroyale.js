import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import '../index.sass';

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: ['score', 'place'],
            order: ['desc', 'asc'],
            scores: [
                {name: "PlayerA", kills: 0, place: 25, score: 15},
                {name: "PlayerB", kills: 0, place: 24, score: 15},
                {name: "PlayerC", kills: 0, place: 23, score: 15},
                {name: "PlayerD", kills: 1, place: 22, score: 30},
                {name: "PlayerE", kills: 0, place: 21, score: 15},
                {name: "PlayerF", kills: 1, place: 20, score: 30},
                {name: "PlayerG", kills: 0, place: 19, score: 15},
                {name: "PlayerH", kills: 0, place: 18, score: 15},
                {name: "PlayerI", kills: 0, place: 17, score: 15},
                {name: "PlayerJ", kills: 2, place: 16, score: 45},
                {name: "PlayerK", kills: 1, place: 15, score: 30},
                {name: "PlayerL", kills: 0, place: 14, score: 15},
                {name: "PlayerM", kills: 0, place: 13, score: 15},
                {name: "PlayerN", kills: 0, place: 12, score: 15},
                {name: "PlayerO", kills: 3, place: 11, score: 60},
                {name: "PlayerP", kills: 1, place: 10, score: 40},
                {name: "PlayerQ", kills: 0, place: 9, score: 20},
                {name: "PlayerR", kills: 0, place: 8, score: 20},
                {name: "PlayerS", kills: 2, place: 7, score: 60},
                {name: "PlayerT", kills: 1, place: 6, score: 40},
                {name: "PlayerU", kills: 1, place: 5, score: 40},
                {name: "PlayerV", kills: 0, place: 4, score: 20},
                {name: "PlayerW", kills: 1, place: 3, score: 40},
                {name: "PlayerX", kills: 7, place: 2, score: 160},
                {name: "PlayerY", kills: 2, place: 1, score: 90},
            ]
        };

        this.sort = this.sort.bind(this);
        this.setSort = this.setSort.bind(this);
    }

    sort() {
        let _ = require('lodash');
        return _.orderBy(this.state.scores, this.state.columns, this.state.order);
    }

    setSort(cols) {

        let isSame = true;
        for (let i = 0; i < cols.length; i++) {
            if (i > this.state.columns.length - 1 || cols[i] !== this.state.columns[i]) {
                isSame = false;
                break;
            }
        }
        let order;
        switch (cols) {
            case ['score', 'place']:
                order = isSame && this.state.order[0] === 'desc' ? ['asc', 'desc'] : ['desc', 'asc'];
                break;
            default:
                order = isSame && this.state.order[0] === 'desc' ? ['asc'] : ['desc'];
                break;
        }

        this.setState({
            order: order,
            columns: cols
        });
    }

    render() {
        const {className, content, season, features, width} = this.props;

        const meta = {
            title: 'Competitive Battle Royale Games',
            description: 'I am a software, web, and mobile developer/engineer who works in PHP, HTML, CSS, JS, ReactJS, Flutter, Java, C and more.',
            canonical: 'http://davisbanks.com/blog/fortnite-pubg',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,software,web,mobile,engineer,developer,blog'
                }
            }
        };

        return (
            <DocumentMeta {...meta}>
                <div className="Article">
                    <img src="/images/fortnite-competitive.jpg"/>
                    <div className="article-content">
                        <h1>Competitive Battle Royale Games</h1>
                        <div className="section first">
                            <p>
                                With battle royale games exploding onto the scene over the past year, it's only
                                natural that they would try to find a path to having a competitive scene.
                                Battle royales in general have a hard time providing a good competitive experience
                                due to the random nature of the genre. Here I want to explain the current problems
                                with these games in a competitive sense, and how I think they could be solved.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Random Competitive Woes</h2>
                            <p>
                                Battle royales games are defined by their randomness right now, ranging from their random
                                storm mechanic to random look drops on the map. These make for interesting and unique
                                experiences in the base game, but can be frustrating when you $100,000 tournament life
                                depends on whether you get a gun in the first room you land at or whether the storm
                                plays to you near the end of the game.
                            </p>
                            <p>
                                Randomness is not inherently bad and is a huge selling point of the core game for
                                most people, it just doesn't serve a competitive scene well. The storm/circle is
                                randomly placed and you aren't informed until it is placed so your initial drop
                                could be far from the circle. Weapon spawns are random and there is always a chance
                                no weapon spawns at all. The final issue is that most battle royale tournaments
                                base your score/placement on your in game place which leads to turtling and hiding.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Fixing the Random</h2>
                            <p>
                                When I talk about fixing the competitive scene I'll mostly talk about Fortnite, some of my
                                suggestions are portable to other battle royales, but it's easier to focus on a concrete
                                example. As I said before, random isn't necessarily bad but players need the tools to be
                                able to combat the random consistently. The main issues I was to address about the randomness
                                is the early game and the storm.
                            </p>
                            <p>
                                When starting a match of competitive fortnite you should drop with a grey revolver with one
                                clip and 20 wood. This gives you six shots which is 6 headshot kills at the beginning, or 3 body kills
                                if you have to fight immediately and 2 buildings to try and keep yourself safe. This will allow
                                some counter play regardless of weapon spawns, although I believe weapon spawns should be guaranteed.
                                What I mean is that in certain rooms it should be guaranteed to have a random weapon inside, which
                                should add more consistency to the initial drop.
                            </p>
                            <p>
                                The final random piece that needs to be fixed is the storm, which I offer a simple solution to. The
                                final circle or second to last circle should be visible on the map from the beginning. This will
                                allow you to make a more informed drop decision early on since you now know where you need to be
                                in the late game. This doesn't necessarily fix the turtling problem, and might honestly make it worse
                                but that's where fixing the scoring comes into place.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Competitive Scoring</h2>
                            <p>
                                A competitive battle royale needs a more interaction based scoring system. By this I mean it should
                                reward skillful interactions between players with points towards the final ranking. This like kills,
                                headshots, opening chests, assists and such should give some amount of points everytime they happen.
                                Here's an example of different actions with points:
                            </p>
                            <Grid className="blog-table">
                                <Row className="table-header">
                                    <Col xs={8} className="cell">Action</Col>
                                    <Col xs={4} className="align-right cell">Points</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">Dropping</Col>
                                    <Col xs={4} className="align-right cell">10</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">Kill</Col>
                                    <Col xs={4} className="align-right cell">10</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">Headshot Kill</Col>
                                    <Col xs={4} className="align-right cell">15</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">Sniper Kill</Col>
                                    <Col xs={4} className="align-right cell">15</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">Sniper Headshot</Col>
                                    <Col xs={4} className="align-right cell">20</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">Open Chest</Col>
                                    <Col xs={4} className="align-right cell">1</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">Open Supply Crate</Col>
                                    <Col xs={4} className="align-right cell">10</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">Assist</Col>
                                    <Col xs={4} className="align-right cell">4</Col>
                                </Row>
                            </Grid>
                            <p>
                                These can be rebalanced or more added to encourage and discourage different actions. Mostly kills
                                are emphasized but other smaller things like chest openings should be rewarded for lower skill
                                levels. The final aspect that needs to be addressed is in game placement. While where you place in
                                game shouldn't be everything, but the point of battle royales is to win. So I suggest a multiplier
                                for your total points based on where you place, something like:
                            </p>
                            <Grid className="blog-table">
                                <Row className="table-header">
                                    <Col xs={8} className="cell">Place</Col>
                                    <Col xs={4} className="align-right cell">Multiplier</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">51 - 100</Col>
                                    <Col xs={4} className="align-right cell">1x</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">26 - 50</Col>
                                    <Col xs={4} className="align-right cell">1.2x</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">11 - 25</Col>
                                    <Col xs={4} className="align-right cell">1.5x</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">2 - 10</Col>
                                    <Col xs={4} className="align-right cell">2x</Col>
                                </Row>
                                <Row>
                                    <Col xs={8} className="cell">1st</Col>
                                    <Col xs={4} className="align-right cell">3x</Col>
                                </Row>
                            </Grid>
                            <p>
                                This should lead to less camping early since you'll need points to actually make your placing matter. while
                                also rewarding someone with a lot of kills more so than someone with very few. Here's a full example of how
                                the scoring would be applied:
                            </p>
                            <Grid className="blog-table">
                                <Row className="table-header">
                                    <Col xs={5} className="cell clickable" onClick={() => this.setSort(['name'])}>Name</Col>
                                    <Col xs={2} className="align-right cell clickable" onClick={() => this.setSort(['kills'])}>Kills</Col>
                                    <Col xs={2} className="align-right cell clickable" onClick={() => this.setSort(['place'])}>Place</Col>
                                    <Col xs={3} className="align-right cell clickable" onClick={() => this.setSort(['score', 'place'])}>Score</Col>
                                </Row>
                                {this.sort().map(function (score, key) {
                                    return <Row key={key}>
                                        <Col xs={5} className="cell">{score.name}</Col>
                                        <Col xs={2} className="align-right cell">{score.kills}</Col>
                                        <Col xs={2} className="align-right cell">{score.place}</Col>
                                        <Col xs={3} className="align-right cell">{score.score}</Col>
                                    </Row>
                                })}

                            </Grid>
                            <p>
                                This shows off how kills really starts to dictate the end rank while still giving some weight to
                                in game place. In game first gets second even though he has less kills than someone else, but 2nd
                                gets first since he has 7 kills. This would help encourage fighting and getting kills and with
                                other actions being factored in like assists and chests you'll start to get more nuance in
                                the placement.
                            </p>
                        </div>
                    </div>
                </div>
            </DocumentMeta>
        )
    }
}

class ArticleRow extends Component {
    render() {
        return (
            <a href="/blog/competitive-battleroyale">
                <div className="article-box">
                    <img src="/images/fortnite-competitive.jpg"/>
                    <div className="box-content">
                        <h3>Competitive Battle Royale Games</h3>
                        <p>
                            Battle Royale games are trying to find a foothold in the competitive scene with varying levels of success.
                            Here are my thoughts on what a battle royale needs to have a successful competitive mode.
                        </p>
                        <div className="time">June 8th, 2018</div>
                    </div>
                </div>
            </a>
        );
    }
}

export {
    Article,
    ArticleRow
};

