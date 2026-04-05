import { useUserState } from '@/domains/auth/hooks/auth.state';
import {
  OAuthLoginButtons,
  OAuthType
} from '@/shared/components/buttons/oauth-login-buttons';
import { DrawerModalContent } from '@/shared/components/ui/drawer-modal/drawer-modal-content';
import { SeparatorWithText } from '@/shared/components/ui/separator-with-text';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthModal } from '../../hooks/use-auth-modal';
import { useGoogleLogin } from '../../hooks/use-google-login';
import { AuthMode } from '../../interfaces/auth.interfaces';
import { AuthByCredentials } from '../auth-by-credentials';

const AuthModalContent = () => {
  const user = useUserState();
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { isOpen, data, onClose } = useAuthModal();
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  useEffect(() => {
    if (user && isOpen) {
      onClose();
      if (data?.redirectData && data?.redirectData !== 'current_path') {
        navigate(data.redirectData);
      }
    }
  }, [user, isOpen, navigate, onClose, data]);

  const onGoogleLogin = useGoogleLogin();

  const onAuth = (type: OAuthType) => {
    if (type === 'google') {
      onGoogleLogin(data?.redirectData);
    }
  };

  return (
    <DrawerModalContent className="flex flex-col gap-2">
      <h1 className="text-center leading-none font-semibold tracking-tight">
        {t(authMode === 'login' ? 'welcome-back' : 'register')}
      </h1>
      <div className="dark:text-muted-foreground [&_a]:hover:text-primary text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
        {t('by-continuing-you-agree-to-our')}{' '}
        <a href="#">{t('terms-of-service')}</a> {t('and')}{' '}
        <a href="#">{t('privacy-policy')}</a>.
      </div>
      <h1 className="dark:text-muted-foreground mt-4 text-center text-sm">
        {t('login-with-your-google-account')}
      </h1>
      <div className="flex flex-col gap-6">
        <OAuthLoginButtons onAuth={onAuth} />
        <SeparatorWithText textKey="or-continue-with" lowercaseText />

        <AuthByCredentials
          authMode={authMode}
          setAuthMode={setAuthMode}
          onClose={onClose}
        />
      </div>
    </DrawerModalContent>
  );
};

export default AuthModalContent;
