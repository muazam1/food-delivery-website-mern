const Newsletter = () => {
    return (
        <section className="wrapper p-top">
            <div className="text-center">
                <h5>Our Subscribe</h5>
                <h2>Subscribe To Our Newsletter</h2>
                <p className="para m-auto">
                    We reccommend you to subscribe to our newsletter, drop your email below tp get daily update about
                    us.
                </p>
                <label className="input-container flex">
                    <input type="email" name="email" placeholder="Enter your email address" id="email"
                        autoComplete="off" />
                    <a className="btn subsbtn cursor-pointer">Subscribe</a>
                </label>
            </div>
        </section>
    );
};

export default Newsletter;
