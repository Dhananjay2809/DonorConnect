import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../Card';
import Button from '../Button';
import { BloodDropIcon } from '../icons/Icons';

type Page = 'home' | 'find' | 'login' | 'register' | 'dashboard';

interface LoginPageProps {
    navigate: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const user = await login(email, password);
            if (user) {
                navigate('dashboard');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-full max-w-md">
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <BloodDropIcon className="h-12 w-12 text-primary mx-auto" />
                        <h2 className="mt-2 text-3xl font-bold">Welcome Back</h2>
                        <p className="text-gray-600">Log in to your DonorConnect account.</p>
                    </div>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <Button type="submit" isLoading={isLoading} className="w-full">
                                Log In
                            </Button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button onClick={() => navigate('register')} className="font-medium text-primary hover:text-primary-dark">
                            Register now
                        </button>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
