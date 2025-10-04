import { onMounted, ref, watch } from 'vue';

export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'component-lab-theme';
const themeMode = ref<ThemeMode>('light');

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('theme-dark');
  } else {
    root.classList.remove('theme-dark');
  }
}

export function useTheme() {
  onMounted(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: ThemeMode = stored ?? (prefersDark ? 'dark' : 'light');
    themeMode.value = initial;
    applyTheme(initial);
  });

  watch(
    themeMode,
    (mode) => {
      if (typeof window === 'undefined') {
        return;
      }
      applyTheme(mode);
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    },
    { immediate: false }
  );

  function toggleTheme() {
    themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark';
  }

  function setTheme(mode: ThemeMode) {
    themeMode.value = mode;
  }

  return {
    themeMode,
    toggleTheme,
    setTheme
  };
}
