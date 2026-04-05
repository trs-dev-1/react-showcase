import { useAuthState } from '@/domains/auth';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { baseURL } from '../constants/axios.constants';
import { ENDPOINTS } from '../constants/endpoints.constants';
import { getTokenExpirationFromLS } from '../utils/local-storage.utils';
import { LocalStorageKeys } from '../hooks/storage/use-local-storage';

// TODO: Adjust the interval to a more suitable value
const REFRESH_TOKEN_REFRESH_INTERVAL = 5000; // 5 seconds for testing purposes
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

let tokenExpiration = getTokenExpirationFromLS() || 0;

const isAccessTokenExpired = (): boolean => {
  const { user } = useAuthState.getState();
  if (!user) return false;

  if (!tokenExpiration) return false;

  return Date.now() >= tokenExpiration;
};

const markAccessTokenAsRefreshed = (): void => {
  const nextValue = Date.now() + REFRESH_TOKEN_REFRESH_INTERVAL;
  localStorage?.setItem(
    'access_token_expiration' satisfies LocalStorageKeys,
    nextValue.toString()
  );
  tokenExpiration = nextValue;
};

const resetExpirationDate = (): void => {
  localStorage?.removeItem(
    'access_token_expiration' satisfies LocalStorageKeys
  );
  tokenExpiration = Date.now();
};

const refreshAccessToken = async (): Promise<void> => {
  if (isRefreshing) {
    return refreshPromise || Promise.resolve();
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      //   throw new AxiosError("Simulated token refresh failure");

      const axiosRefresh = axios.create({
        baseURL,
        withCredentials: true
      });

      await axiosRefresh.post(`${ENDPOINTS.AUTH.REFRESH_TOKEN}`, null);

      markAccessTokenAsRefreshed();
    } catch {
      return Promise.resolve();
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

const refreshTokenInterceptor = async (config: InternalAxiosRequestConfig) => {
  const expired = isAccessTokenExpired();
  if (expired) {
    try {
      if (!isRefreshing) {
        await refreshAccessToken();
      } else {
        // Wait for the ongoing refresh to complete
        await refreshPromise;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return config;
};

export {
  markAccessTokenAsRefreshed,
  refreshTokenInterceptor,
  resetExpirationDate
};
