'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/services/auth';

export function useAuth(requireAuth = true) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authApi.isAuthenticated();
      const currentUser = authApi.getCurrentUser();

      if (requireAuth && !isAuth) {
        router.push('/auth/login');
      } else {
        setUser(currentUser);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [requireAuth, router]);

  return { user, loading, isAuthenticated: !!user };
}
