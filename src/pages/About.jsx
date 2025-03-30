import React from "react";

const About = () => {
    return (
        <div>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center pb-5">
                    About QuickFood
                </h1>
                <div className="bg-white/[0.5] px-5 py-3 m-3 shadow-lg rounded-lg ">
                    <p className="text-lg text-gray-700 mb-4 ">
                        QuickFood is a leading online food delivery system that
                        connects food lovers with the best restaurants in town.
                        Our mission is to provide a seamless and efficient way
                        to browse restaurants, place orders, and enjoy delicious
                        food from the comfort of your home.
                    </p>
                </div>
                <div className="bg-white/[0.5] px-5 py-3 m-3 shadow-lg rounded-lg ">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        At QuickFood, we aim to make your dining experience
                        hassle-free by delivering tasty meals to your doorstep
                        with just a few clicks. We collaborate with local
                        restaurants to offer a wide range of cuisines for every
                        taste and preference.
                    </p>
                </div>
                <div className="bg-white/[0.5] px-5 py-3 m-3 shadow-lg rounded-lg ">
                    <h2 className="text-2xl font-semibold mb-4">
                        Why Choose Us?
                    </h2>
                    <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                        <li>Fast and reliable food delivery service.</li>
                        <li>Secure and easy payment options.</li>
                        <li>
                            Wide variety of restaurants and cuisines to choose
                            from.
                        </li>
                        <li>User-friendly app and website experience.</li>
                    </ul>
                </div>
                <div className="bg-white/[0.5] px-5 py-3 m-3 shadow-lg rounded-lg ">
                    <p className="text-lg text-gray-700">
                        We believe that good food brings people together. That’s
                        why we strive to ensure that every meal you order with
                        us is a great experience. Join us today and enjoy the
                        best food delivered right to your door.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
