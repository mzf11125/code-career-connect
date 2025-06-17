import React, { useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import AuthContext from './AuthContext';
import { AuthContextType } from './types';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserRoles = useCallback(async (userId?: string): Promise<string[]> => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) return [];

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', targetUserId);

    if (error) {
      console.error('Error fetching user roles:', error);
      return [];
    }
    return data.map(item => item.role);
  }, [user?.id]);

  useEffect(() => {
    let isMounted = true;

    const handleAuthChange = async (event: string, session: Session | null) => {
      if (!isMounted) return;
      
      console.log('Auth state changed:', event, session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (isMounted) {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const redirectUrl = `${window.location.origin}/auth/callback`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });
      
      // If user is already registered but not confirmed, we still consider it a success
      // and show the verification message
      if (error?.message?.includes('already registered')) {
        return { error: { message: error.message } };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'An error occurred during signup' 
        } 
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return { error: error ? { message: error.message } : null };
    } catch (error) {
      console.error('Signin error:', error);
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'An error occurred during sign in' 
        } 
      };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateUserRoles = async (roles: string[]) => {
    if (!user) {
      console.log('No user logged in');
      return { error: { message: 'No user logged in' } };
    }

    console.log('Updating roles for user:', user.id, 'roles:', roles);

    try {
      // First, delete existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Error deleting existing roles:', deleteError);
        return { error: { message: deleteError.message } };
      }

      // Then insert new roles
      const roleInserts = roles.map(role => ({
        user_id: user.id,
        role
      }));

      console.log('Inserting roles:', roleInserts);

      const { error: insertError } = await supabase
        .from('user_roles')
        .insert(roleInserts);

      if (insertError) {
        console.error('Error inserting roles:', insertError);
        return { error: { message: insertError.message } };
      }

      console.log('Roles updated successfully');
      return { error: null };
    } catch (error) {
      console.error('Unexpected error updating roles:', error);
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'Unexpected error occurred' 
        } 
      };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateUserRoles,
    getUserRoles,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
