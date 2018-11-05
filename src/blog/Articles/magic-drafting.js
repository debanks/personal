import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import '../index.sass';

class Article extends Component {

    render() {
        const {className, content, season, features, width} = this.props;

        const meta = {
            title: 'MtG: Drafting and Simulation - Davis Banks Blog',
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
                    <img src="/images/magic-draft.jpg"/>
                    <div className="article-content">
                        <h1>MtG: Drafting and Simulation</h1>
                        <div className="section first">
                            <p>
                                Magic the Gathering is a long standing trading card game first created in 1993 and
                                still extremely popular to this day. Magic has been making the transition to digital
                                gaming the past 10 years, and its latest attempt mimics the success of Hearthstone
                                in Magic the Gathering: Arena. Arena focuses on the different formats in Magic the
                                Gathering from constructed (making your own deck with your own cards), drafting
                                (creating a deck with cards given to you to compete with) and other experimental
                                game modes as you slowly build up your collection.
                            </p>
                        </div>

                        <div className="section">
                            <h2>What I Did</h2>
                            <p>
                                My latest project, <a href="http://mtg.davisbanks.com">Magic the Gathering: Arena Helper</a>,
                                has had me looking into how Magic the Gathering generates your first hand and handles drafting.
                                At this point MtG: Arena is in open beta and can be very obtuse and daunting to new players,
                                so I wanted to help bridge the gap for myself and other players that might be in my shoes
                                with this game.
                            </p>
                            <p>
                                This project let me stretch my wings in new ways, mostly from a UI perspective as I wanted to
                                make the interface familiar to Arena players while still adding to it. I completely recreated
                                their drafting interface and allow people to practice drafting without the fee in my project.
                                I also allow people to build constructed decks and then simulate their first hand as many
                                times as they want to see how their distribution works.
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
            <a href="/blog/magic-draft">
                <div className="article-box">
                    <img src="/images/magic-draft.jpg"/>
                    <div className="box-content">
                        <h3>MtG: Drafting and Simulation</h3>
                        <p>
                            My latest side project has had me looking into drafting in Magic the Gathering
                            and simulating hands from decks in Magic the Gathering: Arena. It has been an
                            interesting UI experience and mathematically interesting, so I want to share
                            my experience and thoughts on drafting and first hands in Magic.
                        </p>
                        <div className="time">November 5st, 2018</div>
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

