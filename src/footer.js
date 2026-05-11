import mail from './images/mailIcon.png';
import linkedIn from './images/linkedInIcon.webp';
import gitHub from './images/gitHubIcon.png';
import insta from './images/instaIcon.webp';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-inner">

                {/* Branding */}
                <div className="footer-brand">
                    <p className="footer-name">Kiley Cosgrove</p>
                    <p className="footer-tagline">Designer & Developer</p>
                </div>

                {/* Quick contact info */}
                <div className="footer-contact">
                    <a href="mailto:kiley.a.cos@gmail.com" className="footer-link">
                        <img src={mail} alt="email" className="footer-icon" />
                        kiley.a.cos@gmail.com
                    </a>
                    <a href="https://www.linkedin.com/in/kiley-cosgrove-98b672350/" className="footer-link" target="_blank" rel="noreferrer">
                        <img src={linkedIn} alt="LinkedIn" className="footer-icon" />
                        LinkedIn
                    </a>
                    <a href="https://github.com/kileycos" className="footer-link" target="_blank" rel="noreferrer">
                        <img src={gitHub} alt="GitHub" className="footer-icon" />
                        GitHub
                    </a>
                    <a href="#" className="footer-link">
                        <img src={insta} alt="Instagram" className="footer-icon" />
                        Instagram
                    </a>
                </div>

                {/* Copyright */}
                <p className="footer-copy">© {currentYear} Kiley Cosgrove. All rights reserved.</p>
            </div>
        </footer>
    );
}