import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button, Collapse} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import ReactSwipe from 'react-swipe';
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';
import './index.sass';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import FaArrowDown from 'react-icons/lib/fa/caret-down';
import FaArrowUp from 'react-icons/lib/fa/caret-up';
import Dimensions from 'react-dimensions';
import FaGithub from 'react-icons/lib/fa/github';
import FaLink from 'react-icons/lib/fa/external-link';
import FaApple from 'react-icons/lib/fa/apple';
import FaPlay from 'react-icons/lib/fa/play';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: null,
            content: 0,
            feature: 0,
        };

        this.setSection = this.setSection.bind(this);
        this.updateIndex = this.updateIndex.bind(this);
        this.updateIndex2 = this.updateIndex2.bind(this);
    }

    updateIndex(pageIndex) {
        this.setState({content: pageIndex});
    }

    updateIndex2(pageIndex) {
        this.setState({feature: pageIndex});
    }

    setSection(key, section) {
        if (key === 'content') {
            this.reactSwipe.slide(section, 100);
        } else {
            this.reactSwipe2.slide(section, 100);
        }

        let state = {continuous: false};
        state[key] = section;

        this.setState(state);
    }

    render() {
        const {className} = this.props;

        const meta = {
            title: 'Davis Banks - Software Developer',
            description: 'I am a software, web, and mobile developer/engineer who works in PHP, HTML, CSS, JS, ReactJS, Flutter, Java, C and more.',
            canonical: 'http://davisbanks.com',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,software,web,mobile,engineer,developer'
                }
            }
        };

        let width = this.props.containerWidth;

        let now = new Date();
        let bDay = new Date(1991, 2, 23);
        let diff = (now.getTime() - bDay.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        let age = Math.abs(Math.round(diff / 365.25));

        let titleStyle = {"font-size": "32px", "color": "#f2f2f2"};
        let subtitleStyle = {"font-size": "18px", "color": "#82f1a3", "margin-top": "0"};
        let contentStyle = {"font-size": "20px", "margin-top": "5px", "background": "#444853", "color": "#f2f2f2"};

        return (
            <DocumentMeta {...meta}>
                <div className="HomeComponent">
                    <Element name="top">
                        <div className="main-banner">
                            <img src="/images/delta.png"/>
                            <div className="my-name">DAVIS BANKS</div>
                            <hr/>
                            <div className="my-desc">Senior Software Engineer in the San Diego, California Area</div>
                        </div>
                    </Element>
                    <Grid className="about-me">
                        <Row>
                            <Col md={7}>
                                <h2>About Me</h2>
                                <p>
                                    I am a {age} year old programmer living down in San Diego whose experience is in
                                    web and mobile engineer. My formal education is in software design and I
                                    specialize
                                    in designing backend systems and database management.
                                </p>
                            </Col>
                            <Col md="5">
                                <h3>Best Ofs</h3>
                                <ul>
                                    <li>Created SpirAI, a cryptocurrency portfolio and news website, by myself.</li>
                                    <li>Created Trader Life - A cryptocurrency simulation game for both Android and
                                        IOS
                                    </li>
                                    <li>Helped build out AdHive and added several key systems to the jobs management
                                        and queue systems.
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                    <Element name="work-element">
                        <div className="work-timeline">
                            <div className="timeline">
                                <Timeline>
                                    <TimelineEvent title="Project Lead"
                                                   titleStyle={titleStyle}
                                                   subtitle="SpirAI - ReactJS, PHP, Flutter"
                                                   subtitleStyle={subtitleStyle}
                                                   createdAt={<span className="created-at">2017-07-01 - Now</span>}
                                                   bubbleStyle={{"border": "0px", "background": "#232425"}}
                                                   contentStyle={contentStyle}
                                                   icon={<img style={{"width": "50px"}}
                                                              src="/images/transparentx96.png"/> }
                                    >
                                        I left Underground Elephant to pursue the creation of a new Cryptocurrency
                                        related
                                        company to trade and track new cryptocurrency. I am the sole developer currently
                                        of
                                        this company and we have created <a href="https://spir.ai">SpirAI</a> and
                                        <a href="http://traderlife.io">Trader Life</a>. We work in a ReactJS frontend
                                        with a PHP (Laravel), MySQL backend. Trader Life is built with Flutter for cross
                                        platform development.
                                    </TimelineEvent>
                                    <TimelineEvent title="Senior Software Developer"
                                                   titleStyle={{"font-size": "32px", "color": "#f2f2f2"}}
                                                   subtitle="Underground Elephant - AnjularJS, PHP, ReactJS"
                                                   subtitleStyle={subtitleStyle}
                                                   createdAt={<span
                                                       className="created-at">2015-03-30 - 2017-07-01</span>}
                                                   bubbleStyle={{"border": "0px", "background": "#232425"}}
                                                   contentStyle={contentStyle}
                                                   icon={<img style={{"width": "50px"}} src="/images/ue.svg"/> }
                                    >
                                        I started Underground Elephant as a software developer working on an Ads
                                        creation and management system for Facebook. We created an automated ads
                                        management system that could deploy and alter ads reactively to platform stats.
                                        We created a bill management system that integrated with Quickbooks to manage
                                        the company finances.
                                    </TimelineEvent>
                                    <TimelineEvent title="Web Developer"
                                                   titleStyle={{"font-size": "32px", "color": "#f2f2f2"}}
                                                   subtitle="Neuroscience Information Framework - PHP"
                                                   subtitleStyle={subtitleStyle}
                                                   createdAt={<span
                                                       className="created-at">2012-07-01 - 2015-03-15</span>}
                                                   bubbleStyle={{"border": "0px", "background": "#232425"}}
                                                   contentStyle={contentStyle}
                                                   icon={<img style={{"width": "45px"}} src="/images/nif.png"/> }
                                    >
                                        I started at Neuroscience Information Framework right after college and worked
                                        on their frontend and helped create Scicrunch. We worked purely in PHP/MySQL
                                        and was a portal for access to a wide range of neuroscience data.
                                    </TimelineEvent>
                                </Timeline>
                            </div>
                        </div>
                    </Element>
                    <Element name="education-element">
                        <Grid className="education">
                            <Row>
                                <Col md={3}><img src="/images/UCSD.jpg"/></Col>
                                <Col md={9}>
                                    <h2>Bachelor's in Math and Computer Science</h2>
                                    <h3>University of California - San Diego (2008 - 2012)</h3>
                                    <p>
                                        I went to UCSD in the fall of 2008 originally majoring in Mathematics. Halfway
                                        through my freshman year I took a few classes in Computer Science and decided
                                        to do a joint major in Mathematics and Computer Science. The course work was
                                        mostly in Java and C, and dabbled in a few other languages like C++, Ocaml,
                                        and Python. I had several internships during my eduation ranging from mobile
                                        app development on the NFL app, clinical trial work, and genome sequence
                                        processing.
                                    </p>
                                </Col>
                            </Row>
                        </Grid>
                    </Element>
                    <Element name="project-element">
                        <div className="projects-container">
                            <h2>PROJECTS</h2>
                            <div className="projects">
                                <div className="project"
                                     onClick={() => this.setState({project: this.state.project === 'mtg' ? null : 'mtg'})}>
                                    <div className="project-top">
                                        <img className="project-icon" style={{width: 'auto', height: '50px', marginLeft: '10px'}} src="/images/mtg.png"/>
                                        <Grid className="inline-grid">
                                            <Row>
                                                <Col xs={8} sm={6} className="title">MTG: Arena Helper</Col>
                                                <Col sm={3} xsHidden className="align-right">
                                                    <div className="info-label">Platform</div>
                                                    <div className="info-value">Web</div>
                                                </Col>
                                                <Col xs={4} sm={3} className="align-right">
                                                    <div className="info-label">Language</div>
                                                    <div className="info-value">ReactJS, PHP</div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                    <Collapse in={this.state.project === 'mtg'}>
                                        <div>
                                            <Grid className="project-content">
                                                <Row>
                                                    <Col md={4} className="align-center">
                                                        <img src="/images/mtg-ss.png"/>
                                                    </Col>
                                                    <Col md={8}>
                                                        Magic the Gathering: Arena Helper is a side pet project that aims to help new players
                                                        get into Magic the Gathering: Arena. Mostly this exists because I find Magic interesting
                                                        and the resources for magic lacking. It has some very complicated UI work in the draft
                                                        and build, with a good search engine for new cards.
                                                        <div className="buttons">
                                                            <Button bsStyle="primary" href="http://mtg.davisbanks.com"><FaLink/> Website</Button>
                                                            <Button href="https://github.com/debanks/mtg-backend"><FaGithub/> Backend</Button>
                                                            <Button href="https://github.com/debanks/mtg-frontend"><FaGithub/> Frontend</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </Collapse>
                                    <div className="project-toggle">
                                        {this.state.project !== 'mtg' && <FaArrowDown/>}
                                        {this.state.project === 'mtg' && <FaArrowUp/>}
                                    </div>
                                </div>
                                <div className="project"
                                     onClick={() => this.setState({project: this.state.project === 'bo4-analytics' ? null : 'bo4-analytics'})}>
                                    <div className="project-top">
                                        <img className="project-icon" src="/images/bo4.png"/>
                                        <Grid className="inline-grid">
                                            <Row>
                                                <Col xs={8} sm={6} className="title">BO4 Analytics</Col>
                                                <Col sm={3} xsHidden className="align-right">
                                                    <div className="info-label">Platform</div>
                                                    <div className="info-value">Web</div>
                                                </Col>
                                                <Col xs={4} sm={3} className="align-right">
                                                    <div className="info-label">Language</div>
                                                    <div className="info-value">ReactJS, PHP</div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                    <Collapse in={this.state.project === 'bo4-analytics'}>
                                        <div>
                                            <Grid className="project-content">
                                                <Row>
                                                    <Col md={4} className="align-center">
                                                        <img src="/images/bo4-ss.png"/>
                                                    </Col>
                                                    <Col md={8}>
                                                        BO4 Analytics was a pet project to track my groups analytics in Call of Duty: Black Ops 4. This was a way for me
                                                        to mess around with the analytics provided by Activision and manipulate/collect it in better more informative
                                                        ways.
                                                        <div className="buttons">
                                                            <Button bsStyle="primary" href="http://bo4analytics.com"><FaLink/> Website</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </Collapse>
                                    <div className="project-toggle">
                                        {this.state.project !== 'bo4-analytics' && <FaArrowDown/>}
                                        {this.state.project === 'bo4-analytics' && <FaArrowUp/>}
                                    </div>
                                </div>
                                <div className="project"
                                     onClick={() => this.setState({project: this.state.project === 'fortnite-analytics' ? null : 'fortnite-analytics'})}>
                                    <div className="project-top">
                                        <img className="project-icon" src="/images/fa.png"/>
                                        <Grid className="inline-grid">
                                            <Row>
                                                <Col xs={8} sm={6} className="title">Fortnite Analytics</Col>
                                                <Col sm={3} xsHidden className="align-right">
                                                    <div className="info-label">Platform</div>
                                                    <div className="info-value">Web</div>
                                                </Col>
                                                <Col xs={4} sm={3} className="align-right">
                                                    <div className="info-label">Language</div>
                                                    <div className="info-value">ReactJS, PHP</div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                    <Collapse in={this.state.project === 'fortnite-analytics'}>
                                        <div>
                                            <Grid className="project-content">
                                                <Row>
                                                    <Col md={4} className="align-center">
                                                        <img src="/images/fortniteanalytics.png"/>
                                                    </Col>
                                                    <Col md={8}>
                                                        Fortnite Analytics was a pet project to track my groups analytics in Fortnite. This was a way for me
                                                        to mess around with the analytics provided by Epic and manipulate/collect it in better more informative
                                                        ways.
                                                        <div className="buttons">
                                                            <Button bsStyle="primary" href="http://fortniteanalytics.com"><FaLink/> Website</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </Collapse>
                                    <div className="project-toggle">
                                        {this.state.project !== 'fortnite-analytics' && <FaArrowDown/>}
                                        {this.state.project === 'fortnite-analytics' && <FaArrowUp/>}
                                    </div>
                                </div>
                                <div className="project"
                                     onClick={() => this.setState({project: this.state.project === 'trader-life' ? null : 'trader-life'})}>
                                    <div className="project-top">
                                        <img className="project-icon" src="/images/transparentx96.png"/>
                                        <Grid className="inline-grid">
                                            <Row>
                                                <Col xs={8} sm={6} className="title">Trader Life</Col>
                                                <Col sm={3} xsHidden className="align-right">
                                                    <div className="info-label">Platform</div>
                                                    <div className="info-value">Android, IOS</div>
                                                </Col>
                                                <Col xs={4} sm={3} className="align-right">
                                                    <div className="info-label">Language</div>
                                                    <div className="info-value">Flutter, PHP</div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                    <Collapse in={this.state.project === 'trader-life'}>
                                        <div>
                                            <Grid className="project-content">
                                                <Row>
                                                    <Col md={2} className="align-center">
                                                        <img src="/images/mobile-exchange.png"/>
                                                    </Col>
                                                    <Col md={9}>
                                                        Trader Life is mobile cryptocurrency simulation game where you take the role of a trader and compete against
                                                        everyone else playing to maximize your profit. The game acts as a fully function exchange and has an arcade
                                                        where you can play to earn more points to use on the exchange. The app was built in Flutter/Dart to help with
                                                        cross platform development and the backend is in PHP/Laravel, Node Websocket, and MySQL database.
                                                        <div className="buttons">
                                                            <Button bsStyle="primary" href="http://traderlife.io"><FaLink/> Website</Button>
                                                            <Button bsStyle="danger" href="https://play.google.com/store/apps/details?id=com.delta.traderlife"><FaPlay/> Play Store</Button>
                                                            <Button bsStyle="success" href="https://itunes.apple.com/us/app/trader-life/id1373862932?ls=1&mt=8"><FaApple/> App Store</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </Collapse>
                                    <div className="project-toggle">
                                        {this.state.project !== 'trader-life' && <FaArrowDown/>}
                                        {this.state.project === 'trader-life' && <FaArrowUp/>}
                                    </div>
                                </div>
                                <div className="project"
                                     onClick={() => this.setState({project: this.state.project === 'website' ? null : 'website'})}>
                                    <div className="project-top">
                                        <img className="project-icon circle" src="/images/delta.png"/>
                                        <Grid className="inline-grid">
                                            <Row>
                                                <Col xs={8} sm={6} className="title">Personal Website</Col>
                                                <Col sm={3} xsHidden className="align-right">
                                                    <div className="info-label">Platform</div>
                                                    <div className="info-value">Web</div>
                                                </Col>
                                                <Col xs={4} sm={3} className="align-right">
                                                    <div className="info-label">Language</div>
                                                    <div className="info-value">ReactJS</div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                    <Collapse in={this.state.project === 'website'}>
                                        <div>
                                            <Grid className="project-content">
                                                <Row>
                                                    <Col md={4}>
                                                        <img className="shadow" src="/images/personal.png"/>
                                                    </Col>
                                                    <Col md={8}>
                                                        My personal website is built on ReactJS (doesn't really need to be but I like live reload) and has no backend.
                                                        There is a blog that I decided to just hard code since I don't blog often and would rather have the full
                                                        flexibility of HTML/CSS instead of a WYSIWYG editor. I've redesigned this several times, the current being
                                                        the most streamlined and presents nearly everything on a single page for quick access.
                                                        <div className="buttons">
                                                            <Button bsStyle="primary" href="/"><FaLink/> Website</Button>
                                                            <Button href="https://github.com/debanks/personal"><FaGithub/> Github</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </Collapse>
                                    <div className="project-toggle">
                                        {this.state.project !== 'website' && <FaArrowDown/>}
                                        {this.state.project === 'website' && <FaArrowUp/>}
                                    </div>
                                </div>
                                <div className="project"
                                     onClick={() => this.setState({project: this.state.project === 'spirai' ? null : 'spirai'})}>
                                    <div className="project-top">
                                        <img className="project-icon" src="/images/RNG.png"/>
                                        <Grid className="inline-grid">
                                            <Row>
                                                <Col xs={8} sm={6} className="title">SpirAI</Col>
                                                <Col sm={3} xsHidden className="align-right">
                                                    <div className="info-label">Platform</div>
                                                    <div className="info-value">Web</div>
                                                </Col>
                                                <Col xs={4} sm={3} className="align-right">
                                                    <div className="info-label">Language</div>
                                                    <div className="info-value">ReactJS, PHP</div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                    <Collapse in={this.state.project === 'spirai'}>
                                        <div>
                                            <Grid className="project-content">
                                                <Row>
                                                    <Col md={4}>
                                                        <img className="shadow" src="/images/spirai.png"/>
                                                    </Col>
                                                    <Col md={8}>
                                                        SpirAI is a cryptocurrency social network platform that infuses cryptocurrency data into
                                                        normal social media aspects. It tracks coins across several exchanges and has portfolio
                                                        management for users. The front end was done in ReactJS, with the backend in PHP/Laravel
                                                        and a MySQL database. SpirAI has an extensive job system to pull and update data with
                                                        our own metrics, as well as generate static chart images on the backend.
                                                        <div className="buttons">
                                                            <Button bsStyle="primary" href="https://spir.ai"><FaLink/> Website</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </Collapse>
                                    <div className="project-toggle">
                                        {this.state.project !== 'spirai' && <FaArrowDown/>}
                                        {this.state.project === 'spirai' && <FaArrowUp/>}
                                    </div>
                                </div>
                                <div className="project"
                                     onClick={() => this.setState({project: this.state.project === 'adhive' ? null : 'adhive'})}>
                                    <div className="project-top">
                                        <img className="project-icon" src="/images/adhive-icon.ico"/>
                                        <Grid className="inline-grid">
                                            <Row>
                                                <Col xs={8} sm={6} className="title">AdHive</Col>
                                                <Col sm={3} xsHidden className="align-right">
                                                    <div className="info-label">Platform</div>
                                                    <div className="info-value">Web</div>
                                                </Col>
                                                <Col xs={4} sm={3} className="align-right">
                                                    <div className="info-label">Language</div>
                                                    <div className="info-value">AngularJS, PHP</div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                    <Collapse in={this.state.project === 'adhive'}>
                                        <div>
                                            <Grid className="project-content">
                                                <Row>
                                                    <Col md={4}>
                                                        <img className="shadow" src="/images/adhive.png"/>
                                                    </Col>
                                                    <Col md={8}>
                                                        AdHive was an ad management system for Facebook, Google, and Yahoo ad
                                                        campaigns. It automates the creation, price changing, and pausing/starting of
                                                        ads based on a large set of customizable criteria. The front end was done in
                                                        AngularJS 1 with the backend in PHP/Laravel 4 and a MongoDB instance. AdHive
                                                        uses Beanstalkd and Supervisord for its queue system to update ads periodically.
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </Collapse>
                                    <div className="project-toggle">
                                        {this.state.project !== 'adhive' && <FaArrowDown/>}
                                        {this.state.project === 'adhive' && <FaArrowUp/>}
                                    </div>
                                </div>
                                <div className="project"
                                     onClick={() => this.setState({project: this.state.project === 'scicrunch' ? null : 'scicrunch'})}>
                                    <div className="project-top">
                                        <img className="project-icon" src="/images/scicrunch-logo.png"/>
                                        <Grid className="inline-grid">
                                            <Row>
                                                <Col xs={8} sm={6} className="title">SciCrunch</Col>
                                                <Col sm={3} xsHidden className="align-right">
                                                    <div className="info-label">Platform</div>
                                                    <div className="info-value">Web</div>
                                                </Col>
                                                <Col xs={4} sm={3} className="align-right">
                                                    <div className="info-label">Language</div>
                                                    <div className="info-value">PHP</div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                    <Collapse in={this.state.project === 'scicrunch'}>
                                        <div>
                                            <Grid className="project-content">
                                                <Row>
                                                    <Col md={4}>
                                                        <img className="shadow" src="/images/scicrunch.png"/>
                                                    </Col>
                                                    <Col md={8}>
                                                        SciCrunch is a neuroscience community creation portal that revolves around
                                                        large datasets we had collected and were making available. SciCrunch allowed
                                                        small projects to create an online space to present any relevant data to
                                                        their members. SciCrunch was built just in PHP with a MySQL database.
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </div>
                                    </Collapse>
                                    <div className="project-toggle">
                                        {this.state.project !== 'scicrunch' && <FaArrowDown/>}
                                        {this.state.project === 'scicrunch' && <FaArrowUp/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Element>
                </div>
            </DocumentMeta>
        )
    }
}

export default Dimensions()(Home);
