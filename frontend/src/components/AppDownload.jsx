const AppDownload = () => {
    return (
        <section>
            <div className="wrapper p-top">
                <div className="app-container flex between">
                    <div className="image-container">
                        <img src="/images/mobile-app.png" alt="Mobile App" />
                    </div>
                    <div className="content">
                        <h5>Our Application</h5>
                        <h2>Simple way to <br /> Order your Food</h2>
                        <p className="para">Discover food wherever and whenever <br />
                            and get your food delivery quickly.</p>
                        <a href="https://www.foodpanda.pk/restaurants/new?lng=73.036273&lat=33.700483&vertical=restaurants" className="btn">Get the app</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppDownload;
