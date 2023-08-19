const STORAGE_KEY = "cafe-international";

export function saveApplicationState(state: unknown) {
  console.log("Saving state");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadApplicationState(): unknown {
  console.log("Loading state");
  const state = localStorage.getItem(STORAGE_KEY);
  return state ? JSON.parse(state) : undefined;
}
