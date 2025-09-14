export enum BloodGroup {
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-',
}

export enum UserRole {
    DONOR = 'DONOR',
    RECIPIENT = 'RECIPIENT',
    ADMIN = 'ADMIN',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    location: string;
    bloodGroup?: BloodGroup;
    isVerified?: boolean;
    isAvailable?: boolean;
    lastDonationDate?: string;
}

export enum RequestStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED',
    COMPLETED = 'COMPLETED',
}

export interface BloodRequest {
    id: string;
    recipient: User;
    donor: User;
    status: RequestStatus;
    requestedAt: string;
    message: string;
}

export interface Donation {
    id: string;
    donor: User;
    recipient: User;
    donationDate: string;
    feedback?: string;
}
