
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../Card';
import { BloodRequest, RequestStatus } from '../../types';
import { getRequestsForUser, updateRequestStatus } from '../../services/api';
import Button from '../Button';

const RecipientDashboard: React.FC = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState<BloodRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRequests = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        const userRequests = await getRequestsForUser(user.id);
        setRequests(userRequests.filter(r => r.recipient.id === user.id));
        setIsLoading(false);
    }, [user]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);
    
     const markAsCompleted = async (id: string) => {
        await updateRequestStatus(id, RequestStatus.COMPLETED);
        fetchRequests();
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">My Sent Requests</h3>
            {isLoading && <p>Loading requests...</p>}
            {!isLoading && requests.length === 0 && <p>You have not sent any requests yet.</p>}
            <div className="space-y-4">
                {requests.map(req => (
                    <Card key={req.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <p><strong>To:</strong> {req.donor.name} ({req.donor.bloodGroup})</p>
                            <p className="text-sm text-gray-500">Requested on: {new Date(req.requestedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 md:mt-0">
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                req.status === RequestStatus.PENDING ? 'bg-yellow-100 text-yellow-800' :
                                req.status === RequestStatus.ACCEPTED ? 'bg-green-100 text-green-800' :
                                req.status === RequestStatus.COMPLETED ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                            }`}>{req.status}</span>
                            {req.status === RequestStatus.ACCEPTED && (
                                <Button variant="success" onClick={() => markAsCompleted(req.id)}>Mark as Completed</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecipientDashboard;
