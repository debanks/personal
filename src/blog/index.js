import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import {ArticleRow as FortniteRow} from './Articles/fortnite-pubg';
import {ArticleRow as CompetitiveRow} from './Articles/competitive-battleroyale';
import './index.sass';

class Blog extends Component {

    render() {
        const {className, content, season, features, width} = this.props;

        const meta = {
            title: 'Davis Banks - Blog',
            description: 'I am a software, web, and mobile developer/engineer who works in PHP, HTML, CSS, JS, ReactJS, Flutter, Java, C and more.',
            canonical: 'http://davisbanks.com/blog',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,software,web,mobile,engineer,developer,blog'
                }
            }
        };

        return (
            <DocumentMeta {...meta}>
                <div className="Blog">
                    <div className="main-banner">
                        <div className="my-name">MY BLOG</div>
                        <hr/>
                        <div className="my-desc">This is a place where i'll discuss various topics that interest me,
                            ranging from programming to gaming.
                        </div>
                    </div>
                    <Grid className="articles">
                        <Row>
                            <Col md={4} sm={6} lg={3}>
                                <CompetitiveRow/>
                            </Col>
                            <Col md={4} sm={6} lg={3}>
                                <FortniteRow/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </DocumentMeta>
        )
    }
}

export default Blog;
