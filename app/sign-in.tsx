import { useCallback, useState } from 'react';
import { Button } from 'react-native';

import ThemedText from '~/components/ThemedText';
import ThemedView from '~/components/ThemedView';
import { useAppDispatch } from '~/hooks/reduxHooks';
import { logIn } from '~/lib/slices/authSlice';
import { SupabaseQueryError, useLogInMutation } from '~/lib/supabase/supabaseAPI';

export default function AuthScreen() {
  const dispatch = useAppDispatch();
  const [supabaseLogIn, { isLoading }] = useLogInMutation();
  const [error, setError] = useState<string | null>(null);

  const onLogIn = useCallback(async () => {
    try {
      const payload = await supabaseLogIn({
        email: process.env.EXPO_PUBLIC_SUPABASE_ADMIN_EMAIL!,
        password: process.env.EXPO_PUBLIC_SUPABASE_ADMIN_PASSWORD!,
      }).unwrap();

      if (payload) {
        dispatch(logIn());
      }
    } catch (e) {
      setError((e as SupabaseQueryError).message ?? 'Failed to sign in.');
    }
  }, []);

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText>Note Anything!</ThemedText>
      <Button
        onPress={onLogIn}
        title={isLoading ? 'Signing In...' : 'Sign In as Admin'}
        disabled={isLoading}
      />

      {error && <ThemedText className="mt-4 text-red-500">{error}</ThemedText>}
    </ThemedView>
  );
}
