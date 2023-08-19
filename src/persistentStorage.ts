const STORAGE_KEY = "cafe-international";

export function saveApplicationState(state: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadApplicationState(): unknown {
  const state = localStorage.getItem(STORAGE_KEY);
  return state ? JSON.parse(state) : undefined;
}
