import Page from "./page";
import profile from "./images/profile.JPEG";
import './styles.css';
import { useState, useEffect, useCallback } from "react";
import WaterWalk from './images/WaterWalk.jpg';
import ZeldaOnChair from './images/ZeldaOnChair.JPG';
import Virginia from './images/Virginia2026.JPEG';
import Springfest2026 from './images/Springfest2026.JPG';
import SleepyZelda from './images/SleepyZelda.JPG';
import shelf from './images/SeidenbergShelf.jpg';
import LandK from './images/LiamAndKeira.jpg';
import formalGroup from './images/formal2026One.JPG';
import formalPair from './images/formal2026.JPG';
import FinleyBasket from './images/FinleyBasket.JPG';

const SLIDESHOW_IMAGES = [
    { src: WaterWalk, alt: "three people standing in a line, one holding a balloon" },
    { src: ZeldaOnChair, alt: "Dog standing on chair" },
    { src: Virginia, alt: "girl sitting on wall looking out over mountain scape" },
    {src: Springfest2026, alt: "four people in a circle looking down at the camera"},
    {src: SleepyZelda, alt: "sleeping dog" },
    {src: LandK, alt: "Three people in a line sitting at a cafe"},
    {src: shelf, alt: "person laying on a shelf with the word 'Seidenberg' on the shlef above them"},
    {src: formalGroup, alt: "group of people dressed formally posing for a photo"},
    {src: formalPair, alt: "couple dressed formally"},
    {src: FinleyBasket, alt: "cat sitting in laundry basket"},
];

function Slideshow({ images }) {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent(i => (i + 1) % images.length);
    }, [images.length]);

    const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <div className="slideshow">
            <button className="slide-arrow left" onClick={prev} aria-label="Previous">&#8592;</button>

            <div className="slide-track">
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        className={`slide-img ${i === current ? 'active' : ''}`}
                    />
                ))}
            </div>

            <button className="slide-arrow right" onClick={next} aria-label="Next">&#8594;</button>

            {/* Dot indicators */}
            <div className="slide-dots">
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`slide-dot ${i === current ? 'active' : ''}`}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

function useGitHubProfile(username) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
            fetch(`https://api.github.com/users/${username}/orgs`).then(r => r.json()),
        ]).then(([user, orgs]) => {
            setData({ ...user, orgs });
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [username]);

    return { data, loading };
}

export default function ProfilePage() {
    const { data, loading } = useGitHubProfile('kileycos');

    return (
        <Page>
            <div className="profile-layout">

                <div className="profile-sidebar">
                    <img src={profile} alt="profile photo" className="profile-photo" />

                    {!loading && data && (
                        <div className="github-card">
                            <img src={data.avatar_url} alt="GitHub avatar" className="github-avatar" />
                            <a href={data.html_url} target="_blank" rel="noreferrer" className="github-username">
                                @{data.login}
                            </a>
                            <div className="github-stats">
                                <div className="github-stat">
                                    <span className="stat-number">{data.public_repos}</span>
                                    <span className="stat-label">repos</span>
                                </div>
                                <div className="github-stat">
                                    <span className="stat-number">{data.followers}</span>
                                    <span className="stat-label">followers</span>
                                </div>
                                <div className="github-stat">
                                    <span className="stat-number">{data.following}</span>
                                    <span className="stat-label">following</span>
                                </div>
                            </div>
                            {data.orgs?.length > 0 && (
                                <div className="github-orgs">
                                    <span className="stat-label">organizations</span>
                                    <div className="org-list">
                                        {data.orgs.map(org => (
                                            <a key={org.id} href={`https://github.com/${org.login}`} target="_blank" rel="noreferrer">
                                                <img src={org.avatar_url} alt={org.login} title={org.login} className="org-avatar" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="profile-main">
                    <h2>About Me</h2>
                    <p>
                        I am a student at Pace University, majoring in both Computer Science and art.
                        I also have a minor in graphic design. I love finding places where technology and creativity intersect.
                        I'm passionate about composting, arts and crafts, and ethical design.
                        I love knitting, crocheting, chalk pastels, and digital art.
                        I enjoy cooking, baking, hiking and kayaking. I have a dog named Zelda and a cat named Finley.
                    </p>

                    <h3>Skills</h3>
                    <h6>Programming Languages</h6>
                    <p>Java · Python · CSS · HTML · JavaScript · PHP</p>
                    <h6>Design & Software</h6>
                    <p>Adobe Suite · Blender · Digital Design</p>
                    <h6>Other</h6>
                    <p>Microsoft Suite · Google Suite</p>

                    <div className="slideshow-section">
                      <h3 className="slideshow-title">Gallery</h3>
                      <Slideshow images={SLIDESHOW_IMAGES} />
                    </div>
                </div>

            </div>

           
            
        </Page>
    );
}