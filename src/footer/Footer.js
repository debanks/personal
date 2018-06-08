import React, {Component} from 'react';
import classnames from 'classnames';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';
import FaGithubSquare from 'react-icons/lib/fa/github-square';
import './index.sass';

class Footer extends Component {

    render() {
        const {className, ...props} = this.props;

        return (
            <div className={classnames('Footer', className)}>
                <img src="/images/delta.png" className="footer-image"/>
                <div className="footer-text">Davis Banks</div>
                <div className="icons">
                    <a href="mailto:davis.e.banks+website@gmail.com"><FaEnvelopeO/> Contact Me</a>
                </div>
            </div>
        )
    }
}

export default Footer;