import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useAuthStore } from '@/stores/auth-store';
import { REFRESH_TOKEN_MUTATION } from '@/features/auth/auth.graphql';

/**
 * Hook to check and restore active session on app load
 * Attempts to refresh the access token if a refresh token exists
 */
export function useSessionCheck() {
  const [isChecking, setIsChecking] = useState(true);
  const { auth } = useAuthStore();
  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);

  useEffect(() => {
    const checkSession = async () => {
      // If we already have an access token, assume session is valid
      if (auth.accessToken) {
        setIsChecking(false);
        return;
      }

      // If we have a refresh token, try to get a new access token
      if (auth.refreshToken) {
        try {
          const result = await refreshToken({
            variables: {
              input: { refreshToken: auth.refreshToken },
            },
          });

          if (result.data?.refreshToken) {
            const { accessToken, refreshToken: newRefreshToken, user } = result.data.refreshToken;

            // Update tokens and user in store
            auth.setAccessToken(accessToken);
            auth.setRefreshToken(newRefreshToken);
            auth.setUser({
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              roles: user.roles,
            });

            console.log('Session restored successfully');
          }
        } catch (error) {
          console.error('Failed to restore session:', error);
          // Clear invalid tokens
          auth.reset();
        }
      }

      setIsChecking(false);
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return { isChecking };
}
