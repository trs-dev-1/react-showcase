import { useAuthState } from '@/domains/auth';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { baseURL } from '../constants/axios.constants';
import { ErrorDto } from '../interfaces/dto.interfaces';
import { queryClient } from '../providers/app.provider';
import {
  refreshTokenInterceptor,
  resetExpirationDate
} from '../services/refresh-token.service';
import { toastEmitter } from '../services/toaster-emitter';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(refreshTokenInterceptor, (error) =>
  Promise.reject(error)
);

const resetUserSession = () => {
  const { removeUser } = useAuthState.getState();
  removeUser();
  // race condition, the user is not "removed" in time,
  // so we clear the cache a bit later
  setTimeout(() => {
    queryClient.resetQueries();
    queryClient.clear();
  }, 300);
};

// Response interceptor for handling 401 errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  (error: AxiosError<ErrorDto>) => {
    if (error.response?.status === 401) {
      resetExpirationDate();
      const { user } = useAuthState.getState();

      if (!user) {
        return Promise.reject(error);
      }

      resetUserSession();

      if (
        error.response?.data.message?.startsWith(
          'Invalid refresh token: The Token has expired'
        )
      ) {
        toastEmitter.emit({
          message: 'your-session-has-expired',
          type: 'warning'
        });
      }

      switch (error.response?.data.message) {
        case 'Access token is blacklisted':
        case 'Refresh token is expired':
          toastEmitter.emit({
            message: 'your-session-has-expired',
            type: 'warning'
          });
          break;
      }
    }

    return Promise.reject(error);
  }
);
