import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Navbar, MenuItem, NavDropdown, Nav, Button} from 'react-bootstrap';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import './index.sass';

class Header extends Component {

    render() {
        const {className} = this.props;

        let isBlog = this.props.location.indexOf("/blog") > -1;

        return (
            <div className={classnames('HeaderComponent', className)}>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {!isBlog && <Link to="top" spy={true} smooth={true} duration={500} ><img src="/images/delta.png"/> Davis Banks</Link>}
                            {isBlog && <a href="/"><img src="/images/delta.png"/> Davis Banks</a>}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav className="close-nav">
                            {isBlog && <li><a href="/">Home</a></li>}
                            {!isBlog && <li><Link activeClass="active" to="work-element" spy={true} smooth={true} duration={500} >Work</Link></li>}
                            {!isBlog && <li><Link activeClass="active" to="education-element" spy={true} smooth={true} duration={500} >Education</Link></li>}
                            {!isBlog && <li><Link activeClass="active" to="project-element" spy={true} smooth={true} duration={500} >Project</Link></li>}
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="mailto:davis.e.banks+website@gmail.com">Contact</a></li>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;