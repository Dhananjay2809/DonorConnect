
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BloodDropIcon, MenuIcon, XIcon } from './icons/Icons';

type Page = 'home' | 'find' | 'login' | 'register' | 'dashboard';

interface HeaderProps {
    navigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const NavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => (
        <button
            onClick={() => {
                navigate(page);
                setIsMenuOpen(false);
            }}
            className="text-gray-600 hover:text-primary transition-colors duration-300 font-medium py-2 px-3 rounded-md"
        >
            {children}
        </button>
    );

    const AuthButton: React.FC<{ page: Page; children: React.ReactNode; primary?: boolean }> = ({ page, children, primary = false }) => (
        <button
            onClick={() => {
                navigate(page);
                setIsMenuOpen(false);
            }}
            className={`${
                primary
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white'
            } font-bold py-2 px-4 rounded-md transition-all duration-300`}
        >
            {children}
        </button>
    );

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => navigate('home')}
                    >
                        <BloodDropIcon className="h-8 w-8 text-primary" />
                        <span className="ml-2 text-2xl font-bold text-secondary">
                            DonorConnect
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink page="home">Home</NavLink>
                        <NavLink page="find">Find Donors</NavLink>
                        {user && <NavLink page="dashboard">Dashboard</NavLink>}
                    </div>
                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <>
                                <span className="text-gray-600">Welcome, {user.name.split(' ')[0]}</span>
                                <button
                                    onClick={logout}
                                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded-md transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <AuthButton page="login">Login</AuthButton>
                                <AuthButton page="register" primary>
                                    Register
                                </AuthButton>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        <NavLink page="home">Home</NavLink>
                        <NavLink page="find">Find Donors</NavLink>
                        {user && <NavLink page="dashboard">Dashboard</NavLink>}
                        <div className="pt-4 pb-2 border-t w-full flex justify-center space-x-3">
                            {user ? (
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded-md transition-all duration-300 w-full"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <AuthButton page="login">Login</AuthButton>
                                    <AuthButton page="register" primary>
                                        Register
                                    </AuthButton>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
