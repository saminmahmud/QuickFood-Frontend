import React, { useContext } from "react";
import Restaurants from "../components/Restaurants";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { isOwner } = useContext(AuthContext);
    return (
        <div className="">
            <Restaurants />
        </div>
    );
};

export default Home;
