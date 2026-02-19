import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../style.css';

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const { name, email, subject, message } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                navigate('/');
            } else {
                toast.error(data.message || 'Failed to send message.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <section className="contact-section">
            <div className="wrapper">
                <div className="contact-header">
                    <h5>Contact Us</h5>
                    <h2>Get in Touch</h2>
                </div>

                <div className="contact-container">
                    <div className="contact-card">
                        <form className="contact-form" onSubmit={onSubmit}>
                            {/* Row for Name and Email */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="form-input"
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="form-input"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    placeholder="How can we help?"
                                    className="form-input"
                                    name="subject"
                                    value={subject}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your message here..."
                                    className="form-input textarea-resize-none"
                                    name="message"
                                    value={message}
                                    onChange={onChange}
                                    required
                                ></textarea>
                            </div>

                            <button className="btn-contact">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;