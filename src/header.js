import { Link } from 'react-router-dom';
import Button from "./button.js"
import './styles.css'
import { useState, useEffect } from 'react';
import { useSearch } from './searchContext';
import { searchIndex } from './searchIndex.js';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm, setSubmittedTerm } = useSearch();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    const handleSearch = () => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return;

        const match = searchIndex.find(item =>
            item.tags.toLowerCase().includes(term) ||
            item.title.toLowerCase().includes(term)
        );

        if (match) {
            setSubmittedTerm(term);
            navigate(match.route);
        }
    };

    return (
        <>
            <div className={"header" + (isSticky ? " scrolled" : "")}>
                <h1>Kiley Cosgrove Creation</h1>

                {/* Hamburger + Search grouped together */}
                <div className="header-controls">
                    <div className="hamburger-btn" onClick={toggleSidebar}>
                        ☰
                    </div>
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                    />
                </div>
            </div>

            <div className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sd-header">
                    <h4>Navigation</h4>
                    <div className="close-btn" onClick={toggleSidebar}>
                        <i className="fa fa-times"></i>
                    </div>
                </div>
                <div className="sd-body">
                    <ul>
                        <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
                        <li><Link to="/profile" onClick={toggleSidebar}>Profile</Link></li>
                        <li><Link to="/art" onClick={toggleSidebar}>Art Portfolio</Link></li>
                        <li><Link to="/code" onClick={toggleSidebar}>Coding Portfolio</Link></li>
                        <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
            />
        </>
    );
}