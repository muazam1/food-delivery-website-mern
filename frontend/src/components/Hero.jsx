// 1. Removed GooglePlus (it is defunct)
import { FaXTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa6';

const Hero = () => {
    return (
        // 2. Changed ID to a semantic string
        <section id="hero">
            <div className="hero-section flex wrapper gap-4">
                <div className="content">
                    <h1 className="leading-tight">
                        Enjoy Your <br /> Delicious
                        <span className="text-goldfinger font-extrabold relative inline-block">
                            Food
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-goldfinger opacity-40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="para text-lg text-gray-500 font-light my-8 leading-relaxed max-w-lg">
                        We will fill your tummy with delicious food containing purely natural ingredients with fast & free delivery.
                    </p>
                    <div className="flex gap-4">
                        <a href="#menu" className="btn shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Order now</a>
                        <SocialIcon icon={<FaXTwitter />} link="https://twitter.com" />
                        <SocialIcon icon={<FaInstagram />} link="https://instagram.com" />
                        <SocialIcon icon={<FaFacebookF />} link="https://facebook.com" />
                    </div>
                </div>

                <div className="image-container">
                    {/* 3. Added meaningful Alt text */}
                    <img src="/images/delivery-boy.png" alt="Food delivery courier" />
                </div>
            </div>
        </section>
    );
};

// This component is fine, good use of props!
const SocialIcon = ({ icon, link }) => (
    <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="social-icons"
    >
        {icon}
    </a>
);

export default Hero;