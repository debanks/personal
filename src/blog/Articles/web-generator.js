import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import '../index.sass';

class Article extends Component {

    render() {
        const {className, content, season, features, width} = this.props;

        const meta = {
            title: 'Making a Website Generator - Davis Banks Blog',
            description: 'I am a software, web, and mobile developer/engineer who works in PHP, HTML, CSS, JS, ReactJS, Flutter, Java, C and more.',
            canonical: 'http://davisbanks.com/blog/web-generator',
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
                    <img src="/images/web-generator.jpg"/>
                    <div className="article-content">
                        <h1>Making a Website Generator</h1>
                        <div className="section first">
                            <p>
                                Website creation services have been becoming more and more popular over the year with
                                nearly every business needing a web presence in this day and age. Dev teams to build
                                and maintain websites can be expensive so most companies are opting for something easier
                                to maintain. I always found this type of project interesting as it really is a test of
                                how well you can translate coding into something more human readable, so I want to use
                                this blog as a way to describe my process when creating this project.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Project Goals</h2>
                            <p>
                                As with any project it is important to start with the goals of the finished project as
                                that dictates the features and path forward. For this project I expected to have a
                                system that mostly I would be using to design pages, and clients would use to alter the copy
                                and small other pieces. This was meant to be for creating ad funnels, so there would
                                need to be a lot of flexibility to create forms, different layouts, and have everything be
                                fast. In Short:
                            </p>
                            <ul>
                                <li>Speedy Final Pages</li>
                                <li>Robust Web page creator</li>
                                <li>Ability to quickly edit copy/images</li>
                            </ul>
                            <p>
                                With these in mind I started with just the basic goal of myself being able to quickly
                                design nearly any kind of webpage without the need for code pushes. Having to do code
                                releases for changes would be very restrictive not only for myself, but also for any
                                clients. The editor interface would need to be able to create webpages without code
                                pushes, but be flexible enough to mimic doing a page in raw html/css/js.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Starting Out</h2>
                            <p>
                                My first hurdle was solving how to store the results of the editor. I wanted the result to be
                                easily accessible, and while an api call to grab data used to render the page might not be
                                very significant, I thought there might be a better way. When it comes to optimizing webpages
                                the most efficient thing is to have everything accessible within the frontend project, that is
                                images, HTML, JS, CSS and such should exist on the same webserver, and thus so should the
                                configuration for created webpages.
                            </p>
                            <p>
                                I decided to have the editor make a json object describing the layout and css. Each component
                                would have it's own configuration, style object, and children if needed. If I keep the style
                                components managed by the same form, and maintain the children syntax I could nest objects
                                however I wanted with very minimal issues. I just had to maintain which components were allowed
                                to have children, and then each component managed it's own fields that it needed. This also made
                                it extremely easy to add in new components as I went as they were all self contained. The end
                                result was then a json object that described the entire page that I then saved to a backend DB
                                and also to a file that the frontend could access directly.
                            </p>
                        </div>
                        <div className="section">
                            <h2>The Frontend</h2>
                            <p>
                                The editor was meant to be for me, so really I could make it simple and almost code like. What
                                it needed though was a preview renderer that would act the same as the final frontend. So the
                                preview engine and final frontend run on the same codebase to updates would transfer across.
                                The editor and frontend were done in ReactJS so I could leverage react components in the components
                                I was creating like React Slider, React Bootstrap, React Icons, etc.
                            </p>
                            <p>
                                The frontend would grab the json configuration based on the url path (http://generator.com/file-name
                                would grab file-name.json from the filesystem). The top level had some metadata like the title, keywords
                                and Google Analytics ID to use, then it would pass the body into a Root component to start rendering.
                                The Root component had the job of figuring out which component to render and then passing off that object
                                to be rendered. So all components that had children would call Root to render them. The styling object
                                would be added directly to the JSX being rendered so it would apply to all children as well.
                            </p>
                        </div>
                        <div className="section">
                            <h2>Conclusion</h2>
                            <p>
                                The end result of all this was an editor with a ton of forms that created a JSON object that a ReactJS
                                project would use to render a website. I could recreate nearly any website in it since it was low level
                                and the styling options were extensive. I could (and possibly might) use this system to manage my own
                                portfolio page. The project was incredibly interesting and rewarding, certainly my best attempt at
                                something like this yet.
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
            <a href="/blog/web-generator">
                <div className="article-box">
                    <img src="/images/web-generator.jpg"/>
                    <div className="box-content">
                        <h3>Website Generator</h3>
                        <p>
                            One of the reoccurring themes of my career is creating website/portal creators. This started with
                            SciCrunch which was a community portal creator with limited styling and content editing. My latest
                            project has led to me building a full website editor and I've found the process and infrastructure
                            really interesting.
                        </p>
                        <div className="time">July 3rd, 2018</div>
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

