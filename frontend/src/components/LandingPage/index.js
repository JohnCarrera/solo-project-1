import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import groupImg from '../../img/handsUp.svg';
import ticketImg from '../../img/ticket.svg';
import startGrpImg from '../../img/startGroup.svg';
import onlineImg from '../../img/online_events.svg';
import redBlob from '../../img/red-blob.svg';
import yellowBlob from '../../img/yellow-blob.svg';
import greenBlob from '../../img/green-blob.svg';
import './index.css';


export default function LandingPage() {
    let user = useSelector((state) => state.session.user);

    return (
        <div className='main-body'>
            <div className='blob-div'>
                <img className='green-blob' src={greenBlob}/>
                {/* <img className='red-blob' src={redBlob}/> */}
                {/* <img className='yellow-blob' src={yellowBlob}/> */}
            </div>
            <div className='landing-upper'>
                <div className='left-upper'>
                    <div className='cele'>
                        Celebrating 20 years of
                        {' '}real connections on leet-up
                    </div>
                    <p className='blurb'>
                        Whatever you’re looking to do this year,
                        {' '}leet-up can help. For 20 years, people
                        {' '}have turned to leet-up to meet people,
                        {' '}make friends, find support, grow a business,
                        {' '}and explore their interests. Thousands of
                        {' '}events are happening every day—join the fun.
                    </p>
                </div>
                <div className='right-upper'>
                    <img className='ur-img'
                        src={onlineImg}
                    />
                </div>
            </div>
            <div className='middle'>
                <div className='mid-title'>
                    How leet-up works
                </div>
                <p className='mid-p'>
                    Meet new people who share your interests
                    {' '}through online and in-person events.
                    {' '}It’s free to create an account.
                </p>
            </div>
            <div className='lower'>
                <Link className='landing-link-wrap' to='/browse/groups'>
                    <div className='lower-group'>
                        <div className='low-img-div'>
                            <img className='lower-img'
                                src={groupImg}
                            />
                        </div>
                        <div className='lower-item-title'>
                            Join a group
                        </div>
                        <p className='lower-item-p'>
                            Do what you love, meet others who love it,
                            {' '}find your community. The rest is history!
                        </p>
                    </div>
                </Link>
                <Link className='landing-link-wrap' to='/browse/events'>
                    <div className='lower-group'>
                        <div className='low-img-div'>
                            <img className='lower-img'
                                src={ticketImg}
                            />
                        </div>
                        <div className='lower-item-title'>
                            Find an event
                        </div>
                        <p className='lower-item-p'>
                            Events are happening on just about
                            {' '}any topic you can think of,
                            {' '}from online gaming and photography
                            {' '}to yoga and hiking.
                        </p>
                    </div>
                </Link>
                <Link className='landing-link-wrap' to='/groups/new'>
                    <div className='lower-group'>
                        <div className='low-img-div'>
                            <img className='lower-img'
                                src={startGrpImg}
                            />
                        </div>
                        <div className='lower-item-title'>
                            Start a group
                        </div>
                        <p className='lower-item-p'>
                            You don’t have to be an expert to
                            {' '}gather people together and explore
                            {' '}shared interests.
                        </p>
                    </div>
                </Link>
            </div>
            {!user &&
            <div className='join-landing-btn-div'>
                <Link to='/signup'>
                    <button className='join-landing-btn'>
                        Join leet-up
                    </button>
                </Link>
            </div>
}
        </div>
    )
}
