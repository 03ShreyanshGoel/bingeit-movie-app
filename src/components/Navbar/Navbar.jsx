import React, { useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import caret_icon from '../../assets/caret_icon.svg';
import profile_img from '../../assets/profile_img.png';
import { logout } from '../../firebase';

const Navbar = () => {
    const navRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 80) {
                navRef.current.classList.add('nav-dark');
            } else {
                navRef.current.classList.remove('nav-dark');
            }
        };
        
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={navRef} className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" />
                <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                    <li>Browse by Language</li>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={search_icon} className="icons" alt="Search" />
                <p>Children</p>
                <img src={bell_icon} className="icons" alt="Notifications" />
                <div className="navbar-profile">
                    <img src={profile_img} alt="Profile" className="profile" />
                    <img src={caret_icon} alt="Caret" />
                    <div className="dropdown">
                        <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
