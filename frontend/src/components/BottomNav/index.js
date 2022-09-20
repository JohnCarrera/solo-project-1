import React from 'react';
import { Link } from 'react-router-dom';
import './bottomNav.css';

export default function BottomNav() {
    return (
        <div className='bottom-nav-main'>
            <div className='bottom-nav-info'>
                A Meetup clone by John Carrera
            </div>
            <div className='bottom-nav-right-div'>
                <div className='bottom-nav-linked-in-div'>
                    <a href='https://www.linkedin.com/in/john-carrera-778b53231/'>
                        <img
                            src='https://i.imgur.com/uFg23PI.png'
                            className='bottom-nav-linked-in'
                        />
                    </a>
                </div>
                <div className='bottom-nav-gh-div'>
                    <a href='https://github.com/JohnCarrera'>
                        <img
                            src='https://i.imgur.com/F2HN97k.png'
                            className='bottom-nav-github'
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}
