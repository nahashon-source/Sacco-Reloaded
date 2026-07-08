import { useSyncExternalStore } from 'react';

/**
 * Minimal client-only UI store for cross-cutting UI state (e.g. sidebar
 * collapse). Server state (members, loans, etc.) belongs in TanStack Query,
 * never here — this store must stay UI-only.
 */
interface UIState {
  isSidebarCollapsed: boolean;
}

let state: UIState = { isSidebarCollapsed: false };
const listeners = new Set<() => void>();

const emitChange = () => listeners.forEach((listener) => listener());

export const uiStore = {
  getState: () => state,
  setSidebarCollapsed: (value: boolean) => {
    state = { ...state, isSidebarCollapsed: value };
    emitChange();
  },
  toggleSidebar: () => {
    state = { ...state, isSidebarCollapsed: !state.isSidebarCollapsed };
    emitChange();
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export const useUIState = (): UIState =>
  useSyncExternalStore(uiStore.subscribe, uiStore.getState);
