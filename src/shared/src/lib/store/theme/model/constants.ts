export const ThemeConstant = {
  Dark: 'dark',
  Light: 'light',
} as const;

export const CssColorsVarsConstant = {
  // Basics
  BasicPrimary: 'basic-primary',
  BasicAccent: 'basic-accent',
  BasicSecondary1: 'basic-secondary-1',
  BasicSecondary2: 'basic-secondary-2',
  BasicSecondary3: 'basic-secondary-3',
  BasicSecondary4: 'basic-secondary-4',

  // Brand Colors
  BrandPrimary: 'brand-primary',
  BrandPrimaryLight: 'brand-primary-light',
  BrandSecondary: 'brand-secondary',
  BrandSecondaryLight: 'brand-secondary-light',
  BrandAccent1: 'brand-accent-1',
  BrandAccent2: 'brand-accent-2',
  BrandAccent3: 'brand-accent-3',

  // Alerts
  Alert: 'alert',

  // Backgrounds
  BgPrimary: 'bg-primary',
  BgSecondary: 'bg-secondary',
  BgAccent1: 'bg-accent-1',
  BgAccent2: 'bg-accent-2',
  BgAccent3: 'bg-accent-3',
  BgAccent4: 'bg-accent-4',
  BgAccent5: 'bg-accent-5',
} as const;
