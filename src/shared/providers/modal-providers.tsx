import { AuthModal } from '@/domains/auth';
import { AddPhoneNumberModal } from '../components/modals/add-phone-number-modal/add-phone-number-modal';
import { LockUserModal } from '@/domains/admin';

export const ModalProvider = () => {
  return (
    <>
      <AuthModal />
      <AddPhoneNumberModal />
      <LockUserModal />
    </>
  );
};
