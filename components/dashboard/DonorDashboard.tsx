
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../Card';
import Button from '../Button';
import { BloodRequest, RequestStatus } from '../../types';
import { getRequestsForUser, updateRequestStatus } from '../../services/api';

const DonorDashboard: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('requests');
    const [requests, setRequests] = useState<BloodRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRequests = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        const userRequests = await getRequestsForUser(user.id);
        setRequests(userRequests.filter(r => r.donor.id === user.id));
        setIsLoading(false);
    }, [user]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);
    
    const handleStatusUpdate = async (id: string, status: RequestStatus) => {
        await updateRequestStatus(id, status);
        fetchRequests(); // Refresh list
    };
    
    const handleAvailabilityToggle = () => {
        if (!user) return;
        const updatedUser = { ...user, isAvailable: !user.isAvailable };
        updateUser(updatedUser);
    };

    const renderRequests = () => (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Incoming Blood Requests</h3>
            {isLoading && <p>Loading requests...</p>}
            {!isLoading && requests.length === 0 && <p>No pending requests at the moment.</p>}
            {requests.map(req => (
                <Card key={req.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <p><strong>From:</strong> {req.recipient.name}</p>
                        <p className="text-sm text-gray-600 my-2">"{req.message}"</p>
                        <p className="text-xs text-gray-500">Requested on: {new Date(req.requestedAt).toLocaleString()}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
                        {req.status === RequestStatus.PENDING ? (
                            <>
                                <Button variant="success" onClick={() => handleStatusUpdate(req.id, RequestStatus.ACCEPTED)}>Accept</Button>
                                <Button variant="danger" onClick={() => handleStatusUpdate(req.id, RequestStatus.DECLINED)}>Decline</Button>
                            </>
                        ) : (
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                req.status === RequestStatus.ACCEPTED ? 'bg-green-100 text-green-800' :
                                req.status === RequestStatus.DECLINED ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>{req.status}</span>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );

    const renderProfile = () => (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">My Profile</h3>
            <div className="space-y-2">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Blood Group:</strong> <span className="font-bold text-primary">{user?.bloodGroup}</span></p>
                <p><strong>Location:</strong> {user?.location}</p>
                <p><strong>Last Donation:</strong> {user?.lastDonationDate || 'N/A'}</p>
                <div className="flex items-center space-x-4 pt-4">
                    <p className="font-semibold">Availability:</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={user?.isAvailable} onChange={handleAvailabilityToggle} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-dark/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">{user?.isAvailable ? 'Available' : 'Unavailable'}</span>
                    </label>
                </div>
            </div>
        </Card>
    );

    return (
        <div>
            <div className="mb-6 border-b">
                <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('requests')} className={`py-2 px-4 font-semibold ${activeTab === 'requests' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>Requests</button>
                    <button onClick={() => setActiveTab('profile')} className={`py-2 px-4 font-semibold ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>Profile</button>
                </nav>
            </div>
            {activeTab === 'requests' && renderRequests()}
            {activeTab === 'profile' && renderProfile()}
        </div>
    );
};

export default DonorDashboard;
