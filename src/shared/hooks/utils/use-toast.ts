import { useTranslation } from 'react-i18next';
import { ExternalToast, toast as SonnerToast } from 'sonner';
import { I18nMessage } from '../../interfaces/i18n.interfaces';
import { mapToi18nPayload } from '../../utils/i18n.utils';

export type ToastType = 'success' | 'warning' | 'info' | 'error';

export type ToastPayload = Omit<ExternalToast, 'title' | 'description'> & {
  title?: I18nMessage;
  message: I18nMessage;
  type?: ToastType;
};

export const useToast = () => {
  const [t] = useTranslation();
  const toast = ({
    title,
    message,
    type = 'info',
    ...config
  }: ToastPayload) => {
    return SonnerToast[type](title ? t(...mapToi18nPayload(title)) : '', {
      ...config,
      description: t(...mapToi18nPayload(message)),
      closeButton: true
    });
  };

  return { toast };
};
