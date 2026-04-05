import { type UserDef } from '@/domains/auth';
import { UIState } from '@/shared/interfaces/ui.interfaces';
import { useLocalStorage as useMantineLocalStorage } from '@mantine/hooks';
import type { NavigateOptions } from '@tanstack/react-router';

export type LocalStorageKeys =
  | 'user'
  | 'access_token_expiration'
  | 'ui_preferences'
  | 'redirect_data_after_auth';

export type RedirectDataAfterAuth =
  | (Required<Pick<NavigateOptions, 'to'>> &
      Omit<NavigateOptions, 'replace' | 'resetScroll' | 'to'>)
  | null;

type KeyValueConfig = {
  user: UserDef | null;
  access_token_expiration: number;
  ui_preferences: UIState;
  redirect_data_after_auth: RedirectDataAfterAuth;
};

type MapKeyValueType = {
  [K in keyof KeyValueConfig]: KeyValueConfig[K];
};

type GetReturn<K extends LocalStorageKeys> = MapKeyValueType[K];

type UseLocalStorageReturnType<K extends LocalStorageKeys> = [
  value: GetReturn<K>,
  setValue: (
    value: GetReturn<K> | ((prev: GetReturn<K>) => GetReturn<K>)
  ) => void,
  removeValue: () => void
];

interface UseLocalStorageOptions<K extends LocalStorageKeys> {
  key: K;
  defaultValue: GetReturn<K>;
  getInitialValueInEffect?: boolean;
}

export function useLocalStorage<K extends LocalStorageKeys>(
  options: UseLocalStorageOptions<K>
): UseLocalStorageReturnType<K> {
  return useMantineLocalStorage<GetReturn<K>>({
    key: options.key,
    defaultValue: options.defaultValue,
    getInitialValueInEffect: options.getInitialValueInEffect ?? true
  }) as UseLocalStorageReturnType<K>;
}
