import React from "react";
import { Link } from 'react-router-dom';
import GlobalStatistics from '../components/GlobalStatistics';
import GlobalNewsFeed from '../components/GlobalNewsFeed';
import TwitterFeed from "../components/TwitterFeed";

const Homepage = () => {
    return (
        <div>
            <h1>Covindex</h1>
            <GlobalStatistics />
            <GlobalNewsFeed />
            <TwitterFeed />
        </div>
    )
}

export default Homepage;
