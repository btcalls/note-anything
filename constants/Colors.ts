type Theme = { light: string; dark: string };

export type Colors = {
  // Tailwind colors
  background: Theme;
  foreground: Theme;
  card: Theme;
  cardForeground: Theme;
  popover: Theme;
  popoverForeground: Theme;
  primary: Theme;
  primaryForeground: Theme;
  secondary: Theme;
  secondaryForeground: Theme;
  muted: Theme;
  mutedForeground: Theme;
  accent: Theme;
  accentForeground: Theme;
  destructive: Theme;
  destructiveForeground: Theme;
  border: Theme;
  input: Theme;
  ring: Theme;
  // App-defined colors
  label: Theme;
  tint: Theme;
  icon: Theme;
  tabIconDefault: Theme;
  tabIconSelected: Theme;
};

const BrandColors: { [k: string]: Theme } = {
  brand: { light: 'hsl(13, 87.8%, 48%)', dark: 'hsl(13, 87.8%, 48%)' },
};

const AppColors: Colors = {
  background: { light: 'hsl(0 0% 100%)', dark: 'hsl(200 6.67% 8.82%)' },
  foreground: { light: 'hsl(240 10% 3.9%)', dark: 'hsl(0 0% 98%)' },
  card: { light: 'hsl(0 0% 100%)', dark: 'hsl(240 10% 3.9%)' },
  cardForeground: { light: 'hsl(240 10% 3.9%)', dark: 'hsl(0 0% 98%)' },
  popover: { light: 'hsl(0 0% 100%)', dark: 'hsl(240 10% 3.9%)' },
  popoverForeground: { light: 'hsl(240 10% 3.9%)', dark: 'hsl(0 0% 98%)' },
  primary: { light: 'hsl(240 5.9% 10%)', dark: 'hsl(0 0% 98%)' },
  primaryForeground: { light: 'hsl(0 0% 98%)', dark: 'hsl(240 5.9% 10%)' },
  secondary: { light: 'hsl(240 4.8% 95.9%)', dark: 'hsl(240 3.7% 15.9%)' },
  secondaryForeground: { light: 'hsl(0 0% 98%)', dark: 'hsl(240 5.9% 10%)' },
  muted: { light: 'hsl(240 4.8% 95.9%)', dark: 'hsl(240 3.7% 15.9%)' },
  mutedForeground: { light: 'hsl(240 3.8% 46.1%)', dark: 'hsl(240 5% 64.9%)' },
  accent: { light: 'hsl(240 4.8% 95.9%)', dark: 'hsl(240 3.7% 15.9%)' },
  accentForeground: { light: 'hsl(240 5.9% 10%)', dark: 'hsl(0 0% 98%)' },
  destructive: { light: 'hsl(0 84.2% 60.2%)', dark: 'hsl(0 72% 51%)' },
  destructiveForeground: { light: 'hsl(0 0% 98%)', dark: 'hsl(0 0% 98%)' },
  border: { light: 'hsl(240 5.9% 90%)', dark: 'hsl(240 3.7% 15.9%)' },
  input: { light: 'hsl(240 5.9% 90%)', dark: 'hsl(240 3.7% 15.9%)' },
  ring: { light: 'hsl(240 5.9% 10%;)', dark: 'hsl(240 4.9% 83.9%)' },
  label: { light: 'hsl(201.82 24.44% 8.82%)', dark: 'hsl(210 5.56% 92.94%)' },
  tint: { light: 'hsl(195, 89%, 34%)', dark: 'hsl(0 0% 100%)' },
  icon: { light: 'hsl(205.71 6.31% 43.53%)', dark: 'hsl(207.27 5.82% 62.94%)' },
  tabIconDefault: { light: 'hsl(205.71 6.31% 43.53%)', dark: 'hsl(207.27 5.82% 62.94%)' },
  tabIconSelected: { light: 'hsl(207.27 5.82% 62.94%)', dark: 'hsl(0 0% 100%)' },
};

const getAppColors = (theme: keyof Theme) => {
  return Object.fromEntries(Object.entries(AppColors).map(([key, value]) => [key, value[theme]]));
};

function mapColors(colors: { [k: string]: string }) {
  return Object.assign(
    {},
    ...Object.entries(colors).map(([key, value]) => ({
      ['--' + key]: value.replace(/hsl\(|\)/g, ''),
    }))
  );
}

const ColorsToConfig = Object.assign(
  {},
  ...Object.entries(getAppColors('light')).map(([key]) => ({ [key]: `hsl(var(--${key}))` }))
);

const ColorsToPlugin = {
  ':root': mapColors(getAppColors('light')),
  '.dark:root': mapColors(getAppColors('dark')),
};

module.exports = {
  ColorsToConfig,
  ColorsToPlugin,
  AppColors,
  BrandColors,
};
