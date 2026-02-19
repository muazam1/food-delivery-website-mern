import React from 'react';
import { FaUserTie, FaUtensils, FaTruck, FaAward } from 'react-icons/fa';
import '../style.css';

const About = () => {
    const stats = [
        { id: 1, label: 'Happy Customers', value: '10k+', icon: <FaUserTie /> },
        { id: 2, label: 'Dishes Served', value: '50k+', icon: <FaUtensils /> },
        { id: 3, label: 'Quick Delivery', value: '30min', icon: <FaTruck /> },
        { id: 4, label: 'Years of Service', value: '5+', icon: <FaAward /> },
    ];

    return (
        <div className="bg-pure-white min-h-screen pt-28 pb-12">
            {/* Hero Section */}
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                    <h5 className="text-goldfinger font-bold uppercase tracking-widest text-sm">About Us</h5>
                    <h1 className="text-4xl md:text-5xl font-bold text-lead leading-tight">
                        Passionate About <span className="text-goldfinger">Good Food</span>
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Foodie started with a simple idea: to make delicious, high-quality food accessible to everyone.
                        We believe in freshness, flavor, and fast delivery. From our kitchen to your table,
                        we ensure every meal is a delightful experience.
                    </p>
                </div>
                <div className="relative">
                    <img
                        src="/images/about-us.png"
                        alt="About Foodie"
                        className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                    />
                </div>
            </div>

            {/* Simple Stats Section */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-[1000px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat) => (
                            <div key={stat.id} className="p-4">
                                <div className="text-goldfinger text-3xl mb-2 flex justify-center">
                                    {stat.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-lead">{stat.value}</h3>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
