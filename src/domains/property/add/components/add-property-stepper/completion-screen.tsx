import { Button } from '@/shared/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CompletionScreen = ({
  onReset,
  editMode
}: {
  onReset: () => void;
  editMode: boolean;
}) => {
  const [t] = useTranslation();

  const message = editMode
    ? 'your-property-has-been-updated'
    : 'your-property-has-been-added';

  return (
    <motion.div
      className="py-10 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <motion.div
        className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
      >
        <CheckCircle className="text-background size-10" />
      </motion.div>
      <motion.h3
        className="mb-2 text-2xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {t('success')}! 🎉
      </motion.h3>
      <motion.p
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {t(message)}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button type="button" onClick={onReset}>
          {t('add-a-new-property')}
        </Button>
      </motion.div>
    </motion.div>
  );
};
