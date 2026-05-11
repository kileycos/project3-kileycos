import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Page from './page';
import mail from './images/mailIcon.png';
import linkedIn from './images/linkedInIcon.webp';
import gitHub from './images/gitHubIcon.png';
import insta from './images/instaIcon.webp';
import './styles.css';

const CONTACT_INFO = [
    { key: "workEmail", label: "Work Email", value: "kiley.a.cos@gmail.com", href: "mailto:kiley.a.cos@gmail.com", icon: <img className="icon" src={mail} alt="mail icon" /> },
    { key: "artEmail", label: "Art Email", value: "kaecos.art@gmail.com", href: "mailto:kaecos.art@gmail.com", icon: <img className="icon" src={mail} alt="mail icon" /> },
    { key: "paceEmail", label: "Pace Email", value: "kiley.a.cosgrove@pace.edu", href: "mailto:kiley.a.cosgrove@pace.edu", icon: <img className="icon" src={mail} alt="mail icon" /> },
    { key: "linkedIn", label: "LinkedIn", value: "linkedin.com/in/kiley-cosgrove", href: "https://www.linkedin.com/in/kiley-cosgrove-98b672350/", icon: <img className="icon" src={linkedIn} alt="linkedIn icon" /> },
    { key: "github", label: "GitHub", value: "github.com/kileycos", href: "https://github.com/kileycos", icon: <img className="icon" src={gitHub} alt="gitHub icon" /> },
    { key: "instagram", label: "Instagram", value: "@kaecos.art", href: "#", icon: <img className="icon" src={insta} alt="instagram icon" /> },
];

export default function ContactPage() {
    const formRef = useRef();
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    function handleSubmit(e) {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm(
            'service_7tjsbsd',    
            'template_o6abmq7', 
            formRef.current,
            'PCvIxfzncJ0c2Lz5z'    
        )
        .then(() => {
            setStatus('success');
            formRef.current.reset();
        })
        .catch(() => {
            setStatus('error');
        });
    }

    return (
        <Page>

            {/* Contact info list */}
            {/*<div className="contact-info">
                <ul>
                    {CONTACT_INFO.map(({ key, label, value, href, icon }) => (
                        <li key={key} className="contact-item">
                            {icon}
                            <span className="contact-label">{label}:</span>
                            {href && href !== '#'
                                ? <a href={href} target="_blank" rel="noreferrer">{value}</a>
                                : <span>{value}</span>
                            }
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* Email form */}
            <div className="contact-form-section">
                <h3>Send me a message</h3>
                <div className="contact-form-box">
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="user_name">Name</label>
                            <input
                                id="user_name"
                                type="text"
                                name="user_name"   
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_email">Email</label>
                            <input
                                id="user_email"
                                type="email"
                                name="user_email"  
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                id="subject"
                                type="text"
                                name="subject"
                                placeholder="What's this about?"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"    
                                rows={5}
                                placeholder="Write your message here..."
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>

                        {status === 'success' && <p className="form-success">✓ Message sent! I'll get back to you soon.</p>}
                        {status === 'error' && <p className="form-error">Something went wrong. Try emailing me directly.</p>}
                    </form>
                </div>
            </div>
        </Page>
    );
}