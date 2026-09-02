import { STORAGE_KEYS } from '@/constants/storage';

interface SavedLoginCredentials {
  email: string;
  password: string;
}

export function loadLoginCredentials(): SavedLoginCredentials | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGIN_CREDENTIALS);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SavedLoginCredentials;
    if (!parsed.email || !parsed.password) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveLoginCredentials(credentials: SavedLoginCredentials): void {
  localStorage.setItem(
    STORAGE_KEYS.LOGIN_CREDENTIALS,
    JSON.stringify(credentials),
  );
}

export function clearLoginCredentials(): void {
  localStorage.removeItem(STORAGE_KEYS.LOGIN_CREDENTIALS);
}
