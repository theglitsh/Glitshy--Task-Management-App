import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  userId?: string;
}

const useAuthCheck = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        router.push('/auth/login');
        return;
      }
    };

    setUser({
      name: localStorage.getItem('name')!,
      email: localStorage.getItem('email')!,
    });

    checkAuth();
  }, [router]);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    router.push('/auth/login');
  };

  return { user, loading, logout };
};

export default useAuthCheck;
