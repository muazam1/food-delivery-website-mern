import React from 'react';
import { FaShippingFast, FaHeadset, FaCreditCard, FaLeaf } from 'react-icons/fa';
import '../style.css';

const Services = () => {
    const services = [
        {
            id: 1,
            icon: <FaShippingFast />,
            title: "Super Fast Delivery",
            description: "Hungry? We've got you. Our fleet of riders ensures your food arrives hot and fresh within 30 minutes."
        },
        {
            id: 2,
            icon: <FaLeaf />,
            title: "Fresh & Healthy",
            description: "We partner with top local farms to source the freshest ingredients. No preservatives, just real food."
        },
        {
            id: 3,
            icon: <FaHeadset />,
            title: "24/7 Support",
            description: "Have a question or an issue with your order? Our friendly support team is here to help day or night."
        },
        {
            id: 4,
            icon: <FaCreditCard />,
            title: "Secure Payment",
            description: "Pay your way. We accept all major credit cards, digital wallets, and cash on delivery for your convenience."
        }
    ];

    return (
        <section className="bg-pure-white min-h-screen pt-32 pb-20">
            <div className="wrapper">
                <div className="text-center mb-20">
                    <h5 className="text-goldfinger uppercase tracking-widest font-bold mb-3 text-sm">Our Services</h5>
                    <h2 className="text-4xl md:text-5xl font-bold text-lead">Why Choose Us?</h2>
                    <div className="flex justify-center w-full">
                        <p className="text-gray-500 mt-4 max-w-2xl text-lg text-center leading-relaxed">
                            We don't just deliver food; we deliver happiness. Here's why thousands of customers trust us every day.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <div key={service.id} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-hint-yello rounded-full flex items-center justify-center text-goldfinger text-2xl mb-6 group-hover:bg-goldfinger group-hover:text-white transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-lead mb-4">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
