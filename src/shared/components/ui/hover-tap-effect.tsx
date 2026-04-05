import { motion } from 'framer-motion';
import { FC, isValidElement, ReactNode } from 'react';

type HoverTapEffectProps = {
  children: ReactNode;
};

export const HoverTapEffect: FC<HoverTapEffectProps> = ({ children }) => {
  let animationDisabled = false;

  if (isValidElement(children)) {
    animationDisabled =
      !!(children.props as any)?.disabled ||
      !!(children.props as any)?.isLoading;
  }

  return (
    <motion.div
      className="outline-none"
      whileHover={
        animationDisabled
          ? undefined
          : {
              scale: 1.03
            }
      }
      tabIndex={-1}
      whileTap={animationDisabled ? undefined : { scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
