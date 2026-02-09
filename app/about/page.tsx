import React from 'react';

const AboutPage = () => {
    return (
        <section className="max-w-4xl mx-auto py-12 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-6 text-primary">About DevEvents</h1>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Welcome to <span className="text-teal-300 font-semibold">DevEvents</span>, the ultimate hub for developers to discover and share the most exciting events in the tech world.
                </p>

                <p className="text-base text-gray-400 mb-6">
                    Whether you're looking for hackathons to test your skills, meetups to network with like-minded individuals, or conferences to learn from industry leaders, we've got you covered. Our platform is designed to bring the developer community together, fostering growth, collaboration, and innovation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition duration-300">
                        <h3 className="text-xl font-semibold text-teal-200 mb-2">Discover</h3>
                        <p className="text-sm text-gray-400">Find the latest tech events happening around you and globally.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition duration-300">
                        <h3 className="text-xl font-semibold text-teal-200 mb-2">Connect</h3>
                        <p className="text-sm text-gray-400">Network with other developers and grow your professional circle.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition duration-300">
                        <h3 className="text-xl font-semibold text-teal-200 mb-2">Grow</h3>
                        <p className="text-sm text-gray-400">Enhance your skills and stay updated with the latest industry trends.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
