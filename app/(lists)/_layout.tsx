import { Stack } from 'expo-router';

export default function HomeLayout() {
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: 'Your Lists',
        headerLargeTitle: true,
      }}
    />
    <Stack.Screen name="[id]" options={{ title: '', headerLargeTitle: true }} />
  </Stack>;
}
