import { ModalProvider } from '@/shared/providers/modal-providers';
import { FC, ReactNode } from 'react';
import { AppLayout } from './components/app-layout';

interface AppFrameProps {
  children: ReactNode;
}

export const AppFrame: FC<AppFrameProps> = ({ children }) => {
  return (
    <>
      <ModalProvider />
      <AppLayout>{children}</AppLayout>
    </>
  );
};
