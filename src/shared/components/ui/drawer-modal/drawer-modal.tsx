import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/shared/components/ui/drawer';
import { useMediaQuery } from '@/shared/hooks/utils/use-media-query';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const snapPoints: (number | string)[] = [0.9, 1];
interface DrawerModalProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DrawerModal: React.FC<DrawerModalProps> = ({
  title = '',
  description,
  children,
  open,
  onOpenChange
}) => {
  const [t] = useTranslation();
  const notPhoneSize = useMediaQuery('(min-width: 768px)');
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  if (notPhoneSize) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-132.5">
          <DialogTitle className="text-center font-medium">
            {t(title)}
          </DialogTitle>
          <DialogHeader>
            <DialogDescription className="text-center">
              {description || ''}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      repositionInputs={false}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      fadeFromIndex={0}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center font-medium">
            {t(title)}
          </DrawerTitle>
          <DrawerDescription className="text-center">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div
          data-vaul-no-drag
          className={cn(
            'flex h-[calc(100%-70px)] flex-col overflow-hidden px-4 transition-all',
            snap !== snapPoints[snapPoints.length - 1] && 'h-[calc(100%-160px)]'
          )}
        >
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
