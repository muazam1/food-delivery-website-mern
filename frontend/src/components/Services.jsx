const Services = () => {
    const services = [
        {
            title: "Easy to Order",
            desc: "You only need a few steps in ordering food.",
            img: "/images/easy-to-order.png"
        },
        {
            title: "Fast Delivery",
            desc: "Delivery that is always ontime even faster",
            img: "/images/fast-delivery.png"
        },
        {
            title: "Best Quality",
            desc: "Not only fast for us in quality is also number one.",
            img: "/images/best-quality.png"
        }
    ];

    return (
        <section id="222">
            <div className="p-top wrapper">
                <div className="text-center">
                    <h5>Our Services</h5>
                    <h2>How Does it work</h2>
                </div>
                <div className="flex text-center mt-4 gap-4">
                    {services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="image-container">
                                <img src={service.img} alt={service.title} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ title, desc, img }) => (
    <div className="flex-1 min-w-[300px] text-center p-8 transition-transform hover:-translate-y-2 duration-300">
        <div className="h-40 flex items-center justify-center mb-8">
            <img src={img} alt={title} className="h-full object-contain" />
        </div>
        <h3 className="text-3xl font-bold text-lead mb-4">{title}</h3>
        <p className="text-gray-500 text-xl font-light">{desc}</p>
    </div>
);

export default Services;
