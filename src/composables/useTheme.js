import { ref, watch, computed } from 'vue';

const theme = ref('light');

const applyTheme = value => {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  const body = document.body;
  if (value === 'dark') {
    root.classList.add('dark');
    body.classList.add('dark');
  } else {
    root.classList.remove('dark');
    body.classList.remove('dark');
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('component-lab-theme', value);
  }
};

if (typeof window !== 'undefined') {
  const stored = window.localStorage.getItem('component-lab-theme');
  if (stored === 'dark' || stored === 'light') {
    theme.value = stored;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark';
  }
  applyTheme(theme.value);
}

watch(theme, value => {
  applyTheme(value);
});

const isDark = computed(() => theme.value === 'dark');

export const useTheme = () => ({
  theme,
  isDark,
  toggleTheme: () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  },
  setTheme: value => {
    theme.value = value;
  }
});
