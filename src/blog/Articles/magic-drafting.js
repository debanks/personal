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
                        <div className="section">
                            <h2>Hand Simulation</h2>
                            <p>
                                For anyone unfamiliar with Magic the Gathering, it is a trading card game that typically is
                                played with a 60 card deck. Magic the Gathering (MtG for short) revolves around Land cards,
                                which are a resource that allow you to play other cards. In general you can only play cards
                                that you have enough land of that type to play. Lands look like:
                            </p>
                            <Grid className="lands">
                                <Row>
                                    <Col md={2} sm={6} mdOffset={1}><img src="/images/mountain.png"/></Col>
                                    <Col md={2} sm={6}><img src="/images/plains.png"/></Col>
                                    <Col md={2} sm={6}><img src="/images/island.png"/></Col>
                                    <Col md={2} sm={6}><img src="/images/swamp.png"/></Col>
                                    <Col md={2} sm={6}><img src="/images/forest.png"/></Col>
                                </Row>
                            </Grid>
                            <p>
                                You start each match by drawing 7 cards, which consist of your starting hand. There are ways
                                to change your starting hand (mulliganing) but typically you want your first 7 to be what
                                you need. A lot of statistics have gone into the ideal amount of lands you want in your
                                60 card deck to guaranteed you have the amount of lands you need most often.
                            </p>
                            <p>
                                From a programming perspective, typical MtG hands is pretty simple: you shuffle the deck array,
                                and slice off 7 cards. MtG Arena (a new online version of MtG) changes this up a little bit in
                                that it's first hand algorithm draws 2 different distinct hands and picks the one closest to your
                                mana curve. The mana curve is determined as such:
                            </p>
                            <div className="code">
                                <span className="red">let</span> deckLands = <span className="value"># of lands in deck</span>;<br/>
                                <span className="red">let</span> deckCards = <span className="value"># of cards in deck</span>;<br/>
                                <span className="red">let</span> handSize  = <span className="value">7</span>;<br/>
                                <span className="red">let</span> curve = Math.<span className="green">round</span>(deckLands / deckCards * handSize);<br/><br/>
                                <span className="comment">// let curve = Math.round(20 / 60 * 7) = Math.round(2.33) = 2</span>
                            </div>
                            <p>
                                So most mana curves sit around 2 or 3, so most hands will have 2 or 3 lands regardless of the
                                randomness of the shuffle. This is a little more involved to code up as I have to draw 2 hands,
                                calculate the number of lands in the hands and pick the one closest to the deck's mana curve.
                                For the simulations, I draw X amount of hands that the user picks, do the proper picking of the
                                hands and take account of how many lands where in each hand and which cards were in each hand.
                            </p>
                            <img src="/images/mtg-1.png"/>
                            <p>
                                The goal of this is to be able to test your deck and see how well it draws without having to
                                play out the games to see. Your hands can wildly vary based on the number of lands you have in
                                your deck, so be able to test 20 lands versus 21 lands will show you the number of lands per hand
                                changes drastically.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Drafting</h2>
                            <p>
                                Drafting in MtG is a game mode where you and seven other people take turns picking cards out of
                                24 14/15 card booster packs. Each person gets 3 packs, you open the first pack, pick a card and
                                pass to the next person. You continue picking until there are no more cards and then open the next
                                pack and continue until there are no more packs. In the end you'll have 42 cards from which you'll
                                have to add in lands and make a 40 card deck.
                            </p>
                            <p>
                                Drafting is a very popular game mode as it tends to be a level playing field and entirely based on
                                luck of the pack and experience/skill in picking the best cards to make the best deck. You get to
                                keep the cards you pick, but usually has a cost to participate that can be prohitbative to doing
                                a lot of drafting. So I wanted to be able to mimic the experience of drafting so anyone can learn
                                how to properly pick cards in the draft.
                            </p>
                            <img src="/images/mtg-ss.png"/>
                            <p>
                                From a programming perspective I had to properly make the 24 packs that the user will use to draft
                                from. This meant getting the proper rarity rates and distribution of cards in each pack. Afterwards
                                I send the 24 packs to the frontend to set up the draft. Just like MtG: Arena I needed some bots
                                to replace the other 7 people that are supposed to be drafting for you. I randomly decide which
                                pack the user gets, and then the user has to pick a card.
                            </p>
                            <p>
                                I use React Beautiful DnD for the drag and drop interface for picking a card, so the whole system
                                mimics the experience in game for drafting. Once you select a card, i simulate what every other
                                bot would select from each other pack and pass you the next pack without their picks. The bots
                                pick the rarest card for its first 2 picks, and then picks the rarest card in the 2 land colors
                                it selected in the first 2 picks. This way the user can start to get a feel for which colors are
                                getting passed over just like in a real draft.
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

