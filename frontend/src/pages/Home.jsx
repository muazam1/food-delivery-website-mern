import Hero from '../components/Hero';
import Services from './Services';
import PopularMenu from '../components/PopularMenu';
import Testimonials from '../components/Testimonials';
import AppDownload from '../components/AppDownload';
import Newsletter from '../components/Newsletter';

const Home = () => {
    return (
        <div className="animate-fade-in">
            <Hero />
            <Services />
            <PopularMenu />
            <Testimonials />
            <AppDownload />
            <Newsletter />
        </div>
    );
};

export default Home;
