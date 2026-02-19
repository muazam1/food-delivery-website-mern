import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../style.css'; // Make sure this is imported!

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Assuming this returns { success: boolean, message: string }
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const res = await login(email, password);
            if (res && res.success) {
                toast.success(res.message || "Login successful!");
                navigate('/');
            } else {
                toast.error(res?.message || "Failed to sign in");
                setError(res?.message || "Failed to sign in");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="signin-section">
            <div className="signin-wrapper">
                <div className="signin-card">
                    <div className="signin-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="signin-form">
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="form-input"
                            />
                        </div>

                        <button type="submit" className="btn-signin">
                            Sign In
                        </button>
                    </form>

                    <div className="signin-footer">
                        <p>
                            Don't have an account? <Link to="/signup" className="link-highlight">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;