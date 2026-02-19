import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
    {
        name: "Guy Hawkins",
        img: "/images/profile1.jpeg",
        text: "Foodie is the best. Besides the many delicious meals, the service is also very good, especially very fast delivery. I highly recommend Foodie to you."
    },
    {
        name: "Sophia Anderson",
        img: "/images/profile2.jpeg",
        text: "Fresh ingredients, creative menu, and warm service make this spot a hidden gem. Perfect for casual dinners or special nights out. Truly a foodie’s paradise!"
    },
    {
        name: "Olivia Smith",
        img: "/images/profile3.jpeg",
        text: "Delicious dishes, cozy ambiance, and exceptional service. A must-visit for food lovers seeking bold flavors and unforgettable dining experiences. Highly recommended!"
    }
];

const Testimonials = () => {
    return (
        <section id="444">
            <div className="wrapper p-top flex gap-3">
                <div className="image-container">
                    <img src="/images/delivery-boy-with-phone.png" alt="Delivery" />
                </div>
                <div className="review-container">
                    <h5>Our reviews</h5>
                    <h2>What they say</h2>
                    <div className="relative">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '#next',
                                prevEl: '#prev',
                            }}
                            loop={true}
                            className="mySwiper mt-4"
                        >
                            {reviews.map((review, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex gap-2">
                                        <div className="profile">
                                            <img src={review.img} alt={review.name} />
                                        </div>
                                        <div>
                                            <h4>{review.name}</h4>
                                            <div className="mt-half">
                                                {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="para">
                                        {review.text}
                                    </p>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="flex between">
                            <div className="arrow cursor-pointer" id="prev">
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>
                            <div className="arrow cursor-pointer" id="next">
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
