import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { useSessionCheck } from '@/hooks/use-session-check';

interface SessionProviderProps {
  children: ReactNode;
}

/**
 * Session Provider
 * Checks for active session on app load and restores it if valid
 * Shows loading state while checking
 */
export function SessionProvider({ children }: SessionProviderProps) {
  const { isChecking } = useSessionCheck();

  if (isChecking) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Checking session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
