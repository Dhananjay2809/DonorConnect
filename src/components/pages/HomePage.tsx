import React from 'react';
import Button from '../Button';
import Card from '../Card';
import { ShieldCheckIcon, UserGroupIcon, CheckCircleIcon } from '../icons/Icons';

type Page = 'home' | 'find' | 'login' | 'register' | 'dashboard';

interface HomePageProps {
    navigate: (page: 'find' | 'register') => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <Card className="p-6 text-center flex flex-col items-center">
        <div className="bg-primary-dark/10 text-primary rounded-full p-4 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </Card>
);

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20 bg-white rounded-xl shadow-lg">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4 animate-fade-in-down">
                        Be a Hero. Save a Life.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in-up">
                        Join our community of voluntary blood donors and recipients. Your single donation can save up to three lives.
                    </p>
                    <div className="space-x-4 animate-fade-in-up">
                        <Button
                            onClick={() => navigate('find')}
                            className="px-8 py-3 text-lg"
                        >
                            Find a Donor
                        </Button>
                        <Button
                            onClick={() => navigate('register')}
                            variant="secondary"
                            className="px-8 py-3 text-lg"
                        >
                            Become a Donor
                        </Button>
                    </div>
                </div>
            </section>
            
            {/* How It Works Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<UserGroupIcon className="h-10 w-10" />}
                        title="1. Register"
                        description="Create an account as a donor or a recipient. It's quick, easy, and secure."
                    />
                    <FeatureCard
                        icon={<CheckCircleIcon className="h-10 w-10" />}
                        title="2. Search & Connect"
                        description="Recipients can search for verified donors by blood group and location. Donors get notified of requests."
                    />
                    <FeatureCard
                        icon={<ShieldCheckIcon className="h-10 w-10" />}
                        title="3. Donate & Save"
                        description="Once a request is accepted, coordinate a donation at a nearby hospital or blood bank. Your privacy is protected."
                    />
                </div>
            </section>
        </div>
    );
};

export default HomePage;
