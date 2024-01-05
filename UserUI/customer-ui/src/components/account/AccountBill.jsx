import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import './style.css';
import accountservice from './accountservice';
import React, {useState, useEffect} from 'react';

function AccountBill() {

    return (
        <div className="account-container">
            <div className="account-container">
                <div className="user-profile">
                    <div className="dropdown-container">
                        <button className="yO9lYJ">
                            <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"
                                 className="shopee-svg-icon icon-arrow-left">
                                <g>
                                    <path
                                        d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
                                </g>
                            </svg>
                            <span>TRỞ LẠI</span></button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AccountBill;
