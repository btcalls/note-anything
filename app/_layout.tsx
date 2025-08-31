import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { useColorScheme } from '~/hooks/useColorScheme';
import { NavTheme } from '~/lib/constants';
import { store } from '~/lib/store';

// * Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });
  const theme = colorScheme === 'dark' ? NavTheme.dark : NavTheme.light;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);

    if (loaded) {
      SplashScreen.hideAsync();
      // * To fix issue of screen flashing when navigating between screens
    }
  }, [loaded, theme.colors.background]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Your Lists',
              headerLargeTitle: true,
              headerBackButtonDisplayMode: 'minimal',
            }}
          />
          <Stack.Screen name="details" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
