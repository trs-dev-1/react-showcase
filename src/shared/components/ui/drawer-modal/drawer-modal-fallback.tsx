import { Spinner } from '../spinner';

export const DrawerModalFallback = () => {
  return (
    <div className="relative h-full w-full sm:h-[410px]">
      <Spinner center />
    </div>
  );
};
