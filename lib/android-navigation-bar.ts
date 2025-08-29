import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

import { NavTheme } from '@/lib/constants';

export async function setAndroidNavigationBar(theme: 'light' | 'dark') {
  if (Platform.OS !== 'android') return;

  await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  await NavigationBar.setBackgroundColorAsync(
    theme === 'dark' ? NavTheme.dark.colors.background : NavTheme.light.colors.background
  );
}
