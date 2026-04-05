import { LocalStorageKeys } from '../hooks/storage/use-local-storage';
import { UIState } from '../interfaces/ui.interfaces';

export function getUIStateFromLocalStorage(): UIState | null {
  try {
    return JSON.parse(
      localStorage.getItem(
        'ui_preferences' satisfies LocalStorageKeys
      ) as string
    )?.state?.state;
  } catch {
    return null;
  }
}

export const getTokenExpirationFromLS = (): number | null => {
  try {
    const tokenExpiration = localStorage?.getItem(
      'access_token_expiration' satisfies LocalStorageKeys
    );

    if (!tokenExpiration) {
      return null;
    }

    return parseInt(tokenExpiration, 10);
  } catch {
    return null;
  }
};
