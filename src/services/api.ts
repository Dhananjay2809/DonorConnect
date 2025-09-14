import { MOCK_USERS, MOCK_REQUESTS, MOCK_DONATIONS } from '../constants';
import { User, BloodGroup, UserRole, BloodRequest, RequestStatus } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchDonors = async (filters: { bloodGroup?: BloodGroup; location?: string }): Promise<User[]> => {
    await delay(500);
    console.log('Fetching donors with filters:', filters);
    let donors = MOCK_USERS.filter(user => user.role === UserRole.DONOR && user.isVerified && user.isAvailable);

    if (filters.bloodGroup) {
        donors = donors.filter(d => d.bloodGroup === filters.bloodGroup);
    }
    if (filters.location) {
        donors = donors.filter(d => d.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    return donors;
};

export const sendBloodRequest = async (recipient: User, donor: User, message: string): Promise<BloodRequest> => {
    await delay(500);
    const newRequest: BloodRequest = {
        id: `req${Date.now()}`,
        recipient,
        donor,
        message,
        status: RequestStatus.PENDING,
        requestedAt: new Date().toISOString(),
    };
    MOCK_REQUESTS.unshift(newRequest);
    return newRequest;
}

export const getRequestsForUser = async(userId: string): Promise<BloodRequest[]> => {
    await delay(300);
    return MOCK_REQUESTS.filter(r => r.donor.id === userId || r.recipient.id === userId);
}

export const updateRequestStatus = async (requestId: string, status: RequestStatus): Promise<BloodRequest> => {
    await delay(300);
    const request = MOCK_REQUESTS.find(r => r.id === requestId);
    if (!request) throw new Error("Request not found");
    request.status = status;

    if (status === RequestStatus.COMPLETED) {
        MOCK_DONATIONS.unshift({
            id: `don${Date.now()}`,
            donor: request.donor,
            recipient: request.recipient,
            donationDate: new Date().toISOString(),
        });
    }

    return request;
}

// Admin functions
export const getAllUsers = async (): Promise<User[]> => {
    await delay(400);
    return MOCK_USERS.filter(u => u.role !== UserRole.ADMIN);
};

export const verifyDonor = async (donorId: string): Promise<User> => {
    await delay(300);
    const user = MOCK_USERS.find(u => u.id === donorId);
    if (!user || user.role !== UserRole.DONOR) throw new Error("Donor not found");
    user.isVerified = true;
    return user;
}
