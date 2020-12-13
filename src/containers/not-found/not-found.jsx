
import React from 'react';
import { Link } from 'react-router-dom';
import './not-found.css';

export const NotFound = React.memo((props) => {
    return (
        <div className="not-found-wrapper">
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
            <Link to='/'>
                <button className="button">
                    <i className="icon-home"></i> Go back in initial page, is better.
                </button>
            </Link>
        </div>
    );
});
