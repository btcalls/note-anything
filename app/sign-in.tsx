import { useCallback } from 'react';
import { Button } from 'react-native';

import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';
import { useAppDispatch } from '~/hooks/reduxHooks';
import { logIn } from '~/lib/slices/authSlice';

// TODO: Actual authentication screen and flow
export default function AuthScreen() {
  const dispatch = useAppDispatch();

  const onSignIn = useCallback(() => {
    dispatch(logIn());
  }, []);

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText>Note Anything!</ThemedText>
      <Button onPress={onSignIn} title="Sign In" />
    </ThemedView>
  );
}
