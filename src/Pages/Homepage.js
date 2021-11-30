import React from 'react'
import { Link } from 'react-router-dom';
import GlobalStatistics from '../components/GlobalStatistics';
import NewsFeed from '../components/NewsFeed';

const Homepage = () => {
    return (
        <div>
            <h1>Covindex</h1>
            <GlobalStatistics />
            <NewsFeed />
        </div>
    )
}


export default Homepage
