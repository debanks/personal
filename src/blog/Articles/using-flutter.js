import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import '../index.sass';

class Article extends Component {

    render() {
        const {className, content, season, features, width} = this.props;

        const meta = {
            title: 'Using Flutter - Davis Banks Blog',
            description: 'I am a software, web, and mobile developer/engineer who works in PHP, HTML, CSS, JS, ReactJS, Flutter, Java, C and more.',
            canonical: 'http://davisbanks.com/blog/using-flutter',
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
                    <img src="/images/pubgvsfortnite.jpg"/>
                    <div className="article-content">
                        <h1>Using Flutter - Cross Platform Development</h1>
                        <div className="section first">
                            <p>
                                Flutter is a new mobile app SDK created by Google to be a low level cross platform app
                                development language.
                            </p>
                        </div>
                        <div className="section">
                            <h2>My History</h2>
                            <p>
                                I started off with these games on Pubg, a few weeks after its early access debut. Since then
                                I have accrued 560 hours in PubG playing through multiple phases of its lifespan. I have
                                about 550 games of fortnite over the past 2 months, and very little PuBG in that same
                                timeframe. I was firmly in the camp that PuBG was the better game until recently since I
                                was more familiar with first person shooting from my days with Halo and Call of Duty.
                            </p>
                            <p>
                                Recently that opinion has shifted with the development on PuBG stagnating and Fortnite's
                                development taking off faster than ever. PuBG has had several issues with shitty servers,
                                desync issues, and lack of meaningful progress and new features. Fortnite regularly sees
                                new guns, limited time modes, and bug fixes on a scale I haven't seen before. These are
                                significant reasons why my group jumped ship, but what I really want to focus on today are
                                gameplay differences between the two and differences in methodology that lead to us
                                enjoying fortnite more.
                            </p>
                        </div>
                        <div className="section pos-neg">
                            <h2 className="pos">What I Enjoy</h2>
                            <Grid>
                                <Row>
                                    <Col xs={6} className="border-right">
                                        <h4>PUBG</h4>
                                        <ul>
                                            <li>First Person Gameplay</li>
                                            <li>Tense Encounters and story like matches</li>
                                            <li>Weird hilarious bugs</li>
                                        </ul>
                                    </Col>
                                    <Col xs={6}>
                                        <h4>FORTNITE</h4>
                                        <ul>
                                            <li>Building is another skill to improve on</li>
                                            <li>Constant Updates and freshness</li>
                                            <li>Gameplay feels clean and stable</li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Grid>
                            <h2 className="neg">What I Don't Enjoy</h2>
                            <Grid>
                                <Row>
                                    <Col xs={6} className="border-right">
                                        <h4>PUBG</h4>
                                        <ul>
                                            <li>Server Stability Issues</li>
                                            <li>Inconsistent Hit Registration</li>
                                            <li>Poor weapon balance</li>
                                            <li>Too many attachments</li>
                                        </ul>
                                    </Col>
                                    <Col xs={6}>
                                        <h4>FORTNITE</h4>
                                        <ul>
                                            <li>Very daunting when starting out</li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Grid>
                        </div>
                        <div className="section">
                            <h2>Player Agency</h2>
                            <p>
                                The most noticeable thing after getting better at Fortnite is that I often feel I have more
                                control over each game than I do in PuBG. PuBG has very little player agency and leans
                                heavily into the random aspect of battle royales and low time to kill like Call of Duty.
                                What this ends up feeling like is a random scamble to grab a weapon at the beginning and
                                then potentially just dying to someone shooting at you from the distance without any
                                ability to counter play. The main thing you could have done in that situation is to just
                                have not been there at all.
                            </p>
                            <p>
                                Contrast this to Fortnite where the building mechanic gives you new life in these
                                situations. You can get shot once and then quickly spin around and surround yourself
                                with walls to help block any more fire. With good building and great shooting you can often
                                overcome being shot first from just about anywhere. What feels great about this is that
                                regardless of whether you shot first or were shot, the better player tends to win. This
                                feeling that you can counter what another player is doing, on top of other tactical
                                decisions like rotationing and positioning, means that each game feels better.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Skill Progression</h2>
                            <p>
                                In PuBG your skill progression revolves around 2 aspects: shooting and tactics. The core of
                                it is to be in the right places at the right times and nail your shots. There is a lot of
                                skill that goes into handling the randomness of battle royales and shooting at varying
                                ranges. Lag and desync aside, I found the gun game in PuBG to be lacking, not in depth but
                                in consistency. This isn't unintended by the developers, and if anything they are doubling
                                down on it with the release of more attachments in recent updates.
                            </p>
                            <p>
                                What I mean is that each game of PuBG you'll drop in and randomly find a set of weapons,
                                attachments, and scopes and you have little control over what you have access to early on.
                                Some games last mere minutes, while others can last 10 - 15 minutes at a time. The issue I
                                have is that every attachment (aside from magazines) changes the feel of the gun from
                                vertical and horizontal recoil, to sights and being able to see at all. This means that if
                                one game I have an SCAR-L with a compensator, vertical grip, and 4x scope, it will feel
                                different that a SCAR-L with none of those things or even one with an angled grip and a
                                2x scope.
                            </p>
                            <p>
                                So each game I get a different weapon and attachments, and my experience from the past
                                games doesn't always translate well since I might have had a different set of attachments.
                                This isn't to say you can't learn the feel of all these guns and attachments, it just
                                takes a lot longer and is far more gradual to the point that it can be hard to tell you
                                have gotten better at all. Pair this with the low time to kill and hits causing screen
                                shake and you'll have matches where all of your past experience seemed meaningless and
                                you can't tell if the better player really won.
                            </p>
                            <p>
                                Fortnite always felt very apparent when someone was better than me, and I was better than
                                someone else. From one game to the next my experience with the AR carried over, since
                                regardless of the rarity they always felt the same. Bloom sucks, but it is constant
                                across most guns. The guns are always the same, and Fortnite mostly just introduces more
                                guns and gameplay variations that don't affect prior experience.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Reward Progression</h2>
                            <p>
                                For me it is nice to have something interesting to work toward and both games have very
                                different systems for rewards. Fortnite has the battle pass which has both a free and paid
                                version. The free version provides one challenge per day to complete and earn points
                                towards leveling and rewards. You can get a few sprays and emotes, but not a ton of stuff
                                on the free pass. The $10 battle pass gives you 7 more challenges per week a ton more
                                rewards to work towards during the season.
                            </p>
                            <p>
                                PuBG went the loot box route where you earn points by playing that you can then use to buy
                                a random crate. You open the crate to randomly get an item and the crate you buy is also
                                randomly selected from the available crates. As of writing this you have a 50% chance of
                                getting an entirely free crate, and a 50% chance to get a crate you can't open without
                                buying a $2 key. This means that half the time the reward you receive you can't use without
                                paying money, and the drop rates for what is in the crate is awful. At the high end it
                                would take about $220,000 on average to receive a particular item. For PuBG, you
                                don't get rewards as you'll never receive anything worthwhile.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Wrap Up</h2>
                            <p>
                                Regardless of server issues or bugs, the core game and progression of PuBG leaves a lot to
                                be desired. Ultimately the direction BlueHole is taking the game isn't for me, from
                                inconsistent skill experience, to lack of player agency on top of a very greedy reward
                                system. Fortnite outclasses PuBG in both substance and style and solved the Battle Royale
                                genre in a way PuBG never could. Future battle royales should take note of what Fortnite
                                has done well and incorporate similar experiences in their game.
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
            <a href="/blog/fortnite-pubg">
                <div className="article-box">
                    <img src="/images/pubgvsfortnite.jpg"/>
                    <div className="box-content">
                        <h3>Using Flutter</h3>
                        <p>
                            Having some prior experience using android studio/java for android mobile development, I went into
                            my new project knowing I wanted one codebase for both IOS and android. Originally I was going to use
                            React Native, but Flutter had just released their beta and it seemed like an interesting platform to
                            use. Here's my thoughts after finishing an extensive project with it.
                        </p>
                        <div className="time">June 29th, 2018</div>
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

