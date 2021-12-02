import React from "react";
import GlobalStatistics from "../components/GlobalStatistics";
import GlobalNewsFeed from "../components/newsComponents/GlobalNewsFeed";
import TwitterFeed from "../components/TwitterFeed";
import Navbar from "../components/Navbar";

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <GlobalStatistics />
            <GlobalNewsFeed />
            <TwitterFeed />
        </div>
    );
};

export default Homepage;
