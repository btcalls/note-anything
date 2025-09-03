import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from '~/lib/supabase/supabaseClient';

import { useAppSelector } from './reduxHooks';

export default function useCurrentUser() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    checkSession();
  }, []);

  return { user, isLoggedIn: isLoggedIn || !!user };
}
