import { ref, watchEffect } from 'vue';

const STORAGE_KEY = 'component-lab-theme';

const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;

const isDark = ref(saved ? saved === 'dark' : prefersDark);

if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('dark', isDark.value);
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark.value);
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
  }
});

export function useTheme() {
  return {
    isDark,
    toggleTheme: () => {
      isDark.value = !isDark.value;
    },
    setTheme: (value: 'light' | 'dark') => {
      isDark.value = value === 'dark';
    }
  };
}
