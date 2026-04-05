import { Logo } from '@/shared/components/logo/logo';
import {
  fadeInDown,
  fadeInUp,
  staggerContainerSlow
} from '@/shared/lib/animations';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SelectFiltering } from '../select-filtering/select-filtering';
import { localizationToCountryKeyMap } from '@/shared/constants/i18n.constants';
import { environment } from '@/environment';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-primary/5 dark:bg-primary/10 relative overflow-hidden px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:px-12">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-primary/10 dark:bg-primary/15 size-125 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center gap-6 text-center"
      >
        <motion.div variants={fadeInDown}>
          <Logo className="text-5xl md:text-7xl" />
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col gap-2">
          <h1 className="text-foreground text-3xl font-bold md:text-4xl">
            {t('hero-tagline')}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            {t('hero-subtitle', {
              country: t(localizationToCountryKeyMap[environment.localization])
            })}
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <SelectFiltering />
        </motion.div>
      </motion.div>
    </section>
  );
};
