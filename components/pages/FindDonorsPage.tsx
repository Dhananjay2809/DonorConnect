
import React, { useState, useEffect, useCallback } from 'react';
import { User, BloodGroup } from '../../types';
import { fetchDonors, sendBloodRequest } from '../../services/api';
import { BLOOD_GROUPS } from '../../constants';
import Card from '../Card';
import Button from '../Button';
import Modal from '../Modal';
import { useAuth } from '../../context/AuthContext';
import { BloodDropIcon, LocationMarkerIcon, ShieldCheckIcon } from '../icons/Icons';

const DonorCard: React.FC<{ donor: User; onRequest: (donor: User) => void }> = ({ donor, onRequest }) => (
    <Card className="p-5 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <div className="bg-red-100 text-primary rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
                        {donor.bloodGroup}
                    </div>
                    <div className="ml-4">
                        <h3 className="text-xl font-bold">{donor.name}</h3>
                        <div className="flex items-center text-gray-500 mt-1">
                            <LocationMarkerIcon className="h-5 w-5 mr-1" />
                            <span>{donor.location}</span>
                        </div>
                    </div>
                </div>
                {/* FIX: The 'title' prop was causing a type error. Replaced with a span wrapper to provide the tooltip. */}
                {donor.isVerified && <span title="Verified Donor"><ShieldCheckIcon className="h-6 w-6 text-green-500" /></span>}
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <p>Last Donation: {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'N/A'}</p>
            </div>
        </div>
        <Button onClick={() => onRequest(donor)} className="w-full mt-4">
            Send Request
        </Button>
    </Card>
);

const FindDonorsPage: React.FC = () => {
    const { user } = useAuth();
    const [donors, setDonors] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<{ bloodGroup?: BloodGroup; location?: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState<User | null>(null);
    const [requestMessage, setRequestMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [notification, setNotification] = useState('');

    const searchDonors = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await fetchDonors(filters);
            setDonors(result);
        } catch (error) {
            console.error("Failed to fetch donors", error);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        searchDonors();
    }, [searchDonors]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleRequestClick = (donor: User) => {
        if (!user) {
            setNotification('Please log in to send a blood request.');
            setTimeout(() => setNotification(''), 3000);
            return;
        }
        setSelectedDonor(donor);
        setIsModalOpen(true);
    };

    const handleSendRequest = async () => {
        if (!selectedDonor || !user) return;
        setIsSending(true);
        try {
            await sendBloodRequest(user, selectedDonor, requestMessage);
            setNotification('Blood request sent successfully!');
            setIsModalOpen(false);
            setSelectedDonor(null);
            setRequestMessage('');
        } catch (error) {
            setNotification('Failed to send request. Please try again.');
            console.error(error);
        } finally {
            setIsSending(false);
            setTimeout(() => setNotification(''), 3000);
        }
    }


    return (
        <div>
            {notification && (
                <div className="fixed top-20 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-bounce">
                    {notification}
                </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">Find Available Donors</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        name="bloodGroup"
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">All Blood Groups</option>
                        {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter location (e.g., city, zip)"
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-md"
                    />
                    <Button onClick={searchDonors} isLoading={isLoading}>Search</Button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center">
                    <p>Loading donors...</p>
                </div>
            ) : donors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donors.map(donor => (
                        <DonorCard key={donor.id} donor={donor} onRequest={handleRequestClick} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-10">
                    <BloodDropIcon className="h-16 w-16 mx-auto text-gray-300" />
                    <p className="mt-4 text-xl">No donors found matching your criteria.</p>
                </div>
            )}
             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Request blood from ${selectedDonor?.name}`}>
                <p className="mb-4">You are requesting <span className="font-bold text-primary">{selectedDonor?.bloodGroup}</span> blood.</p>
                <textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Add a message (e.g., reason for request, contact info)"
                    rows={4}
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleSendRequest} isLoading={isSending}>Send Request</Button>
                </div>
            </Modal>
        </div>
    );
};

export default FindDonorsPage;
