
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import FindDonorsPage from './components/pages/FindDonorsPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import { AuthProvider, useAuth } from './context/AuthContext';

type Page = 'home' | 'find' | 'login' | 'register' | 'dashboard';

const AppContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const { user } = useAuth();

    const navigate = (page: Page) => {
        if (page === 'dashboard' && !user) {
            setCurrentPage('login');
        } else {
            setCurrentPage(page);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'find':
                return <FindDonorsPage />;
            case 'login':
                return <LoginPage navigate={navigate} />;
            case 'register':
                return <RegisterPage navigate={navigate} />;
            case 'dashboard':
                return user ? <DashboardPage /> : <LoginPage navigate={navigate} />;
            default:
                return <HomePage navigate={navigate} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-secondary">
            <Header navigate={navigate} />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
