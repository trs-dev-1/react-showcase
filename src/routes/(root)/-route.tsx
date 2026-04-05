import { HomePage } from '@/domains/root';
import { HeadContent } from '@tanstack/react-router';

const OverviewPage = () => {
  return (
    <>
      <HeadContent />
      <HomePage />
    </>
  );
};
export default OverviewPage;
