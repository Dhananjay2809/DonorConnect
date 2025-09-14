
import React from 'react';
import { BloodDropIcon } from './icons/Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t mt-12">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                <div className="flex justify-center items-center mb-2">
                    <BloodDropIcon className="h-6 w-6 text-primary" />
                    <span className="ml-2 text-lg font-bold text-secondary">DonorConnect</span>
                </div>
                <p>&copy; {new Date().getFullYear()} DonorConnect. All rights reserved.</p>
                <p className="text-sm mt-1">Connecting heroes, one drop at a time.</p>
            </div>
        </footer>
    );
};

export default Footer;
