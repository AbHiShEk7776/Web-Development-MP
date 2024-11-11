import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const VerifyOtp = ({ onLogin }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                if (onLogin) {
                    onLogin({ email, token: response.data.token });
                    navigate('/dashboard');
                }
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Enter the OTP sent to your email</h2>
            <form onSubmit={handleOtpSubmit}>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter OTP"
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default VerifyOtp;
