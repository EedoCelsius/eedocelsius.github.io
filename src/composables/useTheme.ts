import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'component-lab-theme';
const theme = ref<ThemeMode>('light');
let mediaQuery: MediaQueryList | null = null;
let mediaListener: ((event: MediaQueryListEvent) => void) | null = null;

function getPreferredTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return;
  }

  document.body.classList.toggle('dark-theme', mode === 'dark');
  document.documentElement.style.setProperty('color-scheme', mode);
}

export function useTheme() {
  onMounted(() => {
    theme.value = getPreferredTheme();
    applyTheme(theme.value);

    if (typeof window === 'undefined') {
      return;
    }

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaListener = (event: MediaQueryListEvent) => {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        theme.value = event.matches ? 'dark' : 'light';
      }
    };

    mediaQuery.addEventListener('change', mediaListener);
  });

  onBeforeUnmount(() => {
    if (mediaQuery && mediaListener) {
      mediaQuery.removeEventListener('change', mediaListener);
    }
  });

  watch(theme, (mode) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, mode);
    }
    applyTheme(mode);
  }, { immediate: true });

  const isDark = computed(() => theme.value === 'dark');

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  const setTheme = (mode: ThemeMode) => {
    theme.value = mode;
  };

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
}
