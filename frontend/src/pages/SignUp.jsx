import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../style.css'; // Ensure CSS is imported

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const checkStrength = (pass) => {
        let score = 0;
        if (!pass) return 0;
        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;
        return score;
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        setPasswordStrength(checkStrength(val));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await register(name, email, password);
            if (res && res.success) {
                toast.success(res.message || "Account created successfully!");
                navigate('/');
            } else {
                toast.error(res?.message || "Registration failed");
                setError(res?.message || "Registration failed");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            setError("Something went wrong. Please try again.");
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength === 0) return 'bg-gray-200';
        if (passwordStrength < 2) return 'bg-red-500';
        if (passwordStrength < 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStrengthText = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength < 2) return 'Weak';
        if (passwordStrength < 3) return 'Medium';
        return 'Strong';
    };

    return (
        <section className="auth-section">
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                        <p>Sign up to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="form-input"
                            />
                        </div>

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
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                className="form-input"
                            />
                            {password && (
                                <div className="mt-2">
                                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className={`text-xs mt-1 text-right font-medium ${passwordStrength < 2 ? 'text-red-500' :
                                        passwordStrength < 3 ? 'text-yellow-600' : 'text-green-600'
                                        }`}>
                                        {getStrengthText()}
                                    </p>
                                </div>
                            )}
                            <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters.</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`form-input ${confirmPassword && password !== confirmPassword ? 'border-red-500' : ''}`}
                            />
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                            )}
                        </div>

                        <button type="submit" className="btn-auth">
                            Sign Up
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account? <Link to="/signin" className="link-highlight">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;