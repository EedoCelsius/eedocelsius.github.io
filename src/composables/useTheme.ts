import { computed, ref } from 'vue';

type ThemeMode = 'light' | 'dark';

const storageKey = 'component-lab-theme';
const theme = ref<ThemeMode>('light');
let mediaQuery: MediaQueryList | null = null;

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle('dark-mode', mode === 'dark');
  root.setAttribute('data-theme', mode);
}

function resolvePreferredTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = window.localStorage.getItem(storageKey) as ThemeMode | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function setTheme(mode: ThemeMode) {
  theme.value = mode;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, mode);
  }
  applyTheme(mode);
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
}

if (typeof window !== 'undefined') {
  const initial = resolvePreferredTheme();
  theme.value = initial;
  applyTheme(initial);

  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (event) => {
    const stored = window.localStorage.getItem(storageKey) as ThemeMode | null;
    if (!stored) {
      setTheme(event.matches ? 'dark' : 'light');
    }
  });
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark');

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
}
