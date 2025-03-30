import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
    return (
        <div >
            <div>
                <Nav />
                <ToastContainer />
            </div>

            <div className="min-h-screen w-full px-4 md:px-8 lg:px-12 pt-4 pb-5 text-black"> 
                <Outlet />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Root;