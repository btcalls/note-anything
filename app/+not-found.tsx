import { Link, Stack } from 'expo-router';

import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView className="flex-1 items-center justify-center p-5">
        <ThemedText className="text-center" type="title">
          This screen doesn't exist.
        </ThemedText>
        <Link href="/sign-in" className="mt-4 p-4">
          <ThemedText type="link">Go to home screen</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
