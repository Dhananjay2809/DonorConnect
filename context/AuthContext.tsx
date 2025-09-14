
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole, BloodGroup } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<User | null>;
    logout: () => void;
    register: (details: Omit<User, 'id'>) => Promise<User | null>;
    updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, pass: string): Promise<User | null> => {
        // Mock API call
        console.log(`Attempting login for ${email}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
                if (foundUser) {
                    setUser(foundUser);
                    resolve(foundUser);
                } else {
                    resolve(null);
                }
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
    };
    
    const register = async (details: Omit<User, 'id'>): Promise<User | null> => {
        // Mock API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser: User = {
                    ...details,
                    id: String(MOCK_USERS.length + 1),
                    isVerified: details.role === UserRole.RECIPIENT ? true : false,
                    isAvailable: details.role === UserRole.DONOR ? true : undefined,
                };
                MOCK_USERS.push(newUser);
                setUser(newUser);
                resolve(newUser);
            }, 500);
        });
    };
    
    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        // In a real app, you'd also update the user in the backend
        const userIndex = MOCK_USERS.findIndex(u => u.id === updatedUser.id);
        if (userIndex > -1) {
            MOCK_USERS[userIndex] = updatedUser;
        }
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
