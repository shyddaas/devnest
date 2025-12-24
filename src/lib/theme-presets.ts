export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  isDark: boolean;
  colors: {
    primary: string;
    'primary-foreground': string;
    secondary: string;
    'secondary-foreground': string;
    accent: string;
    'accent-foreground': string;
    success: string;
    'success-foreground': string;
    background: string;
    foreground: string;
    muted: string;
    'muted-foreground': string;
    card: string;
    'card-foreground': string;
    popover: string;
    'popover-foreground': string;
    border: string;
    input: string;
    ring: string;
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    description: 'Deep blue with electric accents (Default Dark)',
    isDark: true,
    colors: {
      primary: '217 91% 60%',
      'primary-foreground': '0 0% 100%',
      secondary: '217 33% 17%',
      'secondary-foreground': '0 0% 100%',
      accent: '142 76% 36%',
      'accent-foreground': '0 0% 100%',
      success: '142 76% 36%',
      'success-foreground': '0 0% 100%',
      background: '222 47% 11%',
      foreground: '213 31% 91%',
      muted: '223 47% 11%',
      'muted-foreground': '215.4 16.3% 56.9%',
      card: '224 71% 4%',
      'card-foreground': '213 31% 91%',
      popover: '224 71% 4%',
      'popover-foreground': '215 20.2% 65.1%',
      border: '216 34% 17%',
      input: '216 34% 17%',
      ring: '217 91% 60%',
    },
  },
  {
    id: 'neon-tech',
    name: 'Neon Tech',
    description: 'Cyberpunk-inspired neon colors',
    isDark: true,
    colors: {
      primary: '160 100% 50%',
      'primary-foreground': '0 0% 0%',
      secondary: '280 100% 50%',
      'secondary-foreground': '0 0% 100%',
      accent: '320 100% 50%',
      'accent-foreground': '0 0% 100%',
      success: '160 100% 50%',
      'success-foreground': '0 0% 0%',
      background: '0 0% 4%',
      foreground: '160 100% 90%',
      muted: '0 0% 10%',
      'muted-foreground': '160 20% 60%',
      card: '0 0% 6%',
      'card-foreground': '160 100% 90%',
      popover: '0 0% 6%',
      'popover-foreground': '160 100% 90%',
      border: '160 50% 20%',
      input: '160 50% 20%',
      ring: '160 100% 50%',
    },
  },
  {
    id: 'hacker-green',
    name: 'Hacker Green',
    description: 'Classic terminal green',
    isDark: true,
    colors: {
      primary: '120 100% 50%',
      'primary-foreground': '0 0% 0%',
      secondary: '120 100% 25%',
      'secondary-foreground': '0 0% 100%',
      accent: '120 100% 40%',
      'accent-foreground': '0 0% 0%',
      success: '120 100% 50%',
      'success-foreground': '0 0% 0%',
      background: '0 0% 0%',
      foreground: '120 100% 90%',
      muted: '120 20% 10%',
      'muted-foreground': '120 30% 50%',
      card: '120 20% 5%',
      'card-foreground': '120 100% 90%',
      popover: '120 20% 5%',
      'popover-foreground': '120 100% 90%',
      border: '120 50% 20%',
      input: '120 50% 20%',
      ring: '120 100% 50%',
    },
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm orange and purple tones',
    isDark: true,
    colors: {
      primary: '14 100% 60%',
      'primary-foreground': '0 0% 100%',
      secondary: '280 60% 50%',
      'secondary-foreground': '0 0% 100%',
      accent: '30 100% 55%',
      'accent-foreground': '0 0% 0%',
      success: '142 76% 36%',
      'success-foreground': '0 0% 100%',
      background: '240 30% 11%',
      foreground: '30 100% 95%',
      muted: '240 20% 15%',
      'muted-foreground': '30 20% 60%',
      card: '240 30% 8%',
      'card-foreground': '30 100% 95%',
      popover: '240 30% 8%',
      'popover-foreground': '30 100% 95%',
      border: '240 20% 20%',
      input: '240 20% 20%',
      ring: '14 100% 60%',
    },
  },
  {
    id: 'arctic-blue',
    name: 'Arctic Blue',
    description: 'Cool blue and white (Light Mode)',
    isDark: false,
    colors: {
      primary: '210 80% 55%',
      'primary-foreground': '0 0% 100%',
      secondary: '210 40% 90%',
      'secondary-foreground': '210 80% 20%',
      accent: '195 100% 60%',
      'accent-foreground': '0 0% 0%',
      success: '142 76% 36%',
      'success-foreground': '0 0% 100%',
      background: '210 40% 98%',
      foreground: '210 80% 10%',
      muted: '210 40% 94%',
      'muted-foreground': '210 20% 40%',
      card: '0 0% 100%',
      'card-foreground': '210 80% 10%',
      popover: '0 0% 100%',
      'popover-foreground': '210 80% 10%',
      border: '210 40% 85%',
      input: '210 40% 85%',
      ring: '210 80% 55%',
    },
  },
  {
    id: 'light',
    name: 'Light Mode',
    description: 'Clean light theme',
    isDark: false,
    colors: {
      primary: '217 91% 60%',
      'primary-foreground': '0 0% 100%',
      secondary: '210 40% 96%',
      'secondary-foreground': '222.2 47.4% 11.2%',
      accent: '142 76% 36%',
      'accent-foreground': '0 0% 100%',
      success: '142 76% 36%',
      'success-foreground': '0 0% 100%',
      background: '0 0% 100%',
      foreground: '222.2 47.4% 11.2%',
      muted: '210 40% 96.1%',
      'muted-foreground': '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      'card-foreground': '222.2 47.4% 11.2%',
      popover: '0 0% 100%',
      'popover-foreground': '222.2 47.4% 11.2%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '217 91% 60%',
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural green tones',
    isDark: true,
    colors: {
      primary: '142 76% 36%',
      'primary-foreground': '0 0% 100%',
      secondary: '142 40% 20%',
      'secondary-foreground': '0 0% 100%',
      accent: '160 60% 45%',
      'accent-foreground': '0 0% 100%',
      success: '142 76% 36%',
      'success-foreground': '0 0% 100%',
      background: '140 30% 8%',
      foreground: '142 60% 95%',
      muted: '140 20% 12%',
      'muted-foreground': '142 20% 60%',
      card: '140 30% 6%',
      'card-foreground': '142 60% 95%',
      popover: '140 30% 6%',
      'popover-foreground': '142 60% 95%',
      border: '140 30% 18%',
      input: '140 30% 18%',
      ring: '142 76% 36%',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Elegant purple theme',
    isDark: true,
    colors: {
      primary: '270 80% 60%',
      'primary-foreground': '0 0% 100%',
      secondary: '270 40% 25%',
      'secondary-foreground': '0 0% 100%',
      accent: '290 70% 55%',
      'accent-foreground': '0 0% 100%',
      success: '142 76% 36%',
      'success-foreground': '0 0% 100%',
      background: '270 30% 10%',
      foreground: '270 60% 95%',
      muted: '270 20% 15%',
      'muted-foreground': '270 20% 60%',
      card: '270 30% 8%',
      'card-foreground': '270 60% 95%',
      popover: '270 30% 8%',
      'popover-foreground': '270 60% 95%',
      border: '270 30% 20%',
      input: '270 30% 20%',
      ring: '270 80% 60%',
    },
  },
];

export function applyTheme(theme: ThemePreset) {
  const root = document.documentElement;
  
  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Update dark class
  if (theme.isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function getThemeById(id: string): ThemePreset | undefined {
  return THEME_PRESETS.find(theme => theme.id === id);
}

export function getDefaultTheme(): ThemePreset {
  return THEME_PRESETS[0]; // Midnight Blue
}
