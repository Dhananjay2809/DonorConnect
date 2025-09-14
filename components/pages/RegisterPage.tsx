
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../Card';
import Button from '../Button';
import { BloodDropIcon } from '../icons/Icons';
import { UserRole, BloodGroup, User } from '../../types';
import { BLOOD_GROUPS } from '../../constants';

type Page = 'home' | 'find' | 'login' | 'register' | 'dashboard';

interface RegisterPageProps {
    navigate: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        role: UserRole.DONOR,
        bloodGroup: BloodGroup.A_POSITIVE
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const registrationDetails: Omit<User, 'id'> = {
            name: formData.name,
            email: formData.email,
            location: formData.location,
            role: formData.role,
            bloodGroup: formData.role === UserRole.DONOR ? formData.bloodGroup : undefined
        };

        try {
            const user = await register(registrationDetails);
            if (user) {
                navigate('dashboard');
            } else {
                setError('Registration failed. This email may already be in use.');
            }
        } catch (err) {
            setError('An unexpected error occurred during registration.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-full max-w-lg">
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <BloodDropIcon className="h-12 w-12 text-primary mx-auto" />
                        <h2 className="mt-2 text-3xl font-bold">Create Your Account</h2>
                        <p className="text-gray-600">Join DonorConnect and make a difference.</p>
                    </div>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Full Name</label>
                                <input name="name" type="text" required onChange={handleChange} className="mt-1 block w-full input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email Address</label>
                                <input name="email" type="email" required onChange={handleChange} className="mt-1 block w-full input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Password</label>
                                <input name="password" type="password" required onChange={handleChange} className="mt-1 block w-full input" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Location (City, State)</label>
                                <input name="location" type="text" required onChange={handleChange} className="mt-1 block w-full input" />
                            </div>
                        </div>

                         <div>
                            <label className="block text-sm font-medium">I want to:</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full input">
                                <option value={UserRole.DONOR}>Donate Blood</option>
                                <option value={UserRole.RECIPIENT}>Receive Blood</option>
                            </select>
                        </div>
                        
                        {formData.role === UserRole.DONOR && (
                            <div>
                                <label className="block text-sm font-medium">Blood Group</label>
                                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="mt-1 block w-full input">
                                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </div>
                        )}

                        <div className="pt-4">
                            <Button type="submit" isLoading={isLoading} className="w-full">
                                Create Account
                            </Button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <button onClick={() => navigate('login')} className="font-medium text-primary hover:text-primary-dark">
                            Log in
                        </button>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;
