
import React, { useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../../types';
import { getAllUsers, verifyDonor } from '../../services/api';
import Card from '../Card';
import Button from '../Button';

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        const allUsers = await getAllUsers();
        setUsers(allUsers);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleVerification = async (userId: string) => {
        await verifyDonor(userId);
        fetchUsers(); // Refresh list
    };
    
    const unverifiedDonors = users.filter(u => u.role === UserRole.DONOR && !u.isVerified);

    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Admin Controls</h3>
            <h4 className="text-lg font-medium mb-2">Verify New Donors</h4>
            {isLoading && <p>Loading donors...</p>}
            {!isLoading && unverifiedDonors.length === 0 && <p>No new donors to verify.</p>}
            <div className="space-y-3">
                {unverifiedDonors.map(donor => (
                    <div key={donor.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{donor.name} ({donor.email})</p>
                            <p className="text-sm text-gray-600">Blood Group: {donor.bloodGroup} | Location: {donor.location}</p>
                        </div>
                        <Button variant="success" onClick={() => handleVerification(donor.id)}>
                            Verify
                        </Button>
                    </div>
                ))}
            </div>
            {/* Placeholder for more admin features */}
            <div className="mt-8 border-t pt-6">
                <h4 className="text-lg font-medium mb-2">Platform Statistics</h4>
                <p className="text-gray-600">Total Users: {users.length}</p>
                <p className="text-gray-600">Total Donors: {users.filter(u=>u.role===UserRole.DONOR).length}</p>
                 <p className="text-gray-600">Total Recipients: {users.filter(u=>u.role===UserRole.RECIPIENT).length}</p>
            </div>
        </Card>
    );
};

export default AdminDashboard;
