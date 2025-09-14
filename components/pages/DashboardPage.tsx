
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import DonorDashboard from '../dashboard/DonorDashboard';
import RecipientDashboard from '../dashboard/RecipientDashboard';
import AdminDashboard from '../dashboard/AdminDashboard';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    const renderDashboard = () => {
        if (!user) {
            return <p>Loading dashboard...</p>;
        }

        switch (user.role) {
            case UserRole.DONOR:
                return <DonorDashboard />;
            case UserRole.RECIPIENT:
                return <RecipientDashboard />;
            case UserRole.ADMIN:
                return <AdminDashboard />;
            default:
                return <p>Invalid user role.</p>;
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
            {renderDashboard()}
        </div>
    );
};

export default DashboardPage;
