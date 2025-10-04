import { computed, ref, watch } from 'vue';

type ColorMode = 'light' | 'dark';

const STORAGE_KEY = 'component-lab:color-mode';
const mode = ref<ColorMode>('light');
let initialized = false;

function applyMode(value: ColorMode) {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = value;
  }
}

function init() {
  if (initialized || typeof window === 'undefined') {
    return;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as ColorMode | null;
  if (stored === 'light' || stored === 'dark') {
    mode.value = stored;
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    mode.value = prefersDark ? 'dark' : 'light';
  }

  applyMode(mode.value);

  initialized = true;
}

export function useColorMode() {
  init();

  const isDark = computed(() => mode.value === 'dark');

  const setMode = (value: ColorMode) => {
    mode.value = value;
  };

  const toggleMode = () => {
    mode.value = isDark.value ? 'light' : 'dark';
  };

  watch(
    mode,
    (value) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, value);
      }
      applyMode(value);
    },
    { immediate: true }
  );

  return {
    mode,
    isDark,
    setMode,
    toggleMode
  };
}
