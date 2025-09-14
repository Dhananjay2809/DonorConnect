
import { BloodGroup, User, UserRole, BloodRequest, RequestStatus, Donation } from './types';

export const BLOOD_GROUPS: BloodGroup[] = Object.values(BloodGroup);

export const MOCK_USERS: User[] = [
    { id: '1', name: 'Admin User', email: 'admin@donorconnect.com', role: UserRole.ADMIN, location: 'Platform HQ' },
    { id: '2', name: 'John Doe', email: 'john.d@email.com', role: UserRole.DONOR, location: 'New York, NY', bloodGroup: BloodGroup.O_POSITIVE, isVerified: true, isAvailable: true, lastDonationDate: '2023-10-15' },
    { id: '3', name: 'Jane Smith', email: 'jane.s@email.com', role: UserRole.DONOR, location: 'Los Angeles, CA', bloodGroup: BloodGroup.A_NEGATIVE, isVerified: true, isAvailable: true, lastDonationDate: '2023-11-01' },
    { id: '4', name: 'Peter Jones', email: 'peter.j@email.com', role: UserRole.DONOR, location: 'Chicago, IL', bloodGroup: BloodGroup.B_POSITIVE, isVerified: false, isAvailable: false, lastDonationDate: '2024-01-20' },
    { id: '5', name: 'Mary Williams', email: 'mary.w@email.com', role: UserRole.DONOR, location: 'New York, NY', bloodGroup: BloodGroup.AB_POSITIVE, isVerified: true, isAvailable: true, lastDonationDate: '2023-09-05' },
    { id: '6', name: 'Recipient Rick', email: 'rick@email.com', role: UserRole.RECIPIENT, location: 'New York, NY', bloodGroup: BloodGroup.O_POSITIVE },
    { id: '7', name: 'Recipient Rachel', email: 'rachel@email.com', role: UserRole.RECIPIENT, location: 'Los Angeles, CA', bloodGroup: BloodGroup.A_NEGATIVE },
];

export const MOCK_REQUESTS: BloodRequest[] = [
    { id: 'req1', recipient: MOCK_USERS[5], donor: MOCK_USERS[1], status: RequestStatus.PENDING, requestedAt: new Date().toISOString(), message: "Urgent need for O+ blood for surgery." },
    { id: 'req2', recipient: MOCK_USERS[6], donor: MOCK_USERS[2], status: RequestStatus.ACCEPTED, requestedAt: new Date(Date.now() - 86400000).toISOString(), message: "Requesting A- blood for my mother." },
];

export const MOCK_DONATIONS: Donation[] = [
    { id: 'don1', donor: MOCK_USERS[2], recipient: MOCK_USERS[6], donationDate: '2023-11-20', feedback: "Jane was a lifesaver, thank you so much!" },
];
