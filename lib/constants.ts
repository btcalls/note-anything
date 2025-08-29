import { Theme } from '@react-navigation/native';
import { fonts } from '@react-navigation/native/src/theming/fonts';

export const NavTheme: { light: Theme; dark: Theme } = {
  light: {
    dark: false,
    colors: {
      primary: 'hsl(211 100% 50%)', // primary
      background: 'hsl(0 0% 94.9%)', // background
      card: 'hsl(0 0% 100%)', // card
      text: 'hsl(240 3.4% 11.4%)', // foreground
      border: 'hsl(0 0% 84.7%)', // border
      notification: 'hsl(3 100% 59.4%)', // destructive
    },
    fonts,
  },
  dark: {
    dark: true,
    colors: {
      primary: 'hsl(210 100% 52%)', // primary
      background: 'hsl(0 0% 0.4%)', // background
      card: 'hsl(0 0% 7.1%)', // card
      text: 'hsl(240 40% 90.2%)', // foreground
      border: 'hsl(240 2.5% 15.7%)', // border
      notification: 'hsl(3 100% 61.4%)', // destructive
    },
    fonts,
  },
};
