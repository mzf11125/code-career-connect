
import { createContext } from 'react';
import { AuthContextType } from './types';

/**
 * AuthContext provides authentication state and methods throughout the app.
 * Use the `useAuth` hook from '@/hooks/useAuth' to access these values.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
