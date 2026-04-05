import { Container } from '@/shared/components/ui/container';
import { scaleIn, staggerContainerMedium } from '@/shared/lib/animations';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const STATS = [
  { valueKey: 'stat-properties-value', labelKey: 'stat-properties-label' },
  { valueKey: 'stat-cities-value', labelKey: 'stat-cities-label' },
  { valueKey: 'stat-satisfied-value', labelKey: 'stat-satisfied-label' },
  { valueKey: 'stat-agents-value', labelKey: 'stat-agents-label' }
];

export const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-muted/50 py-10 dark:bg-muted/30">
      <Container>
        <motion.div
          variants={staggerContainerMedium}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-8 text-center md:grid-cols-4"
        >
          {STATS.map(({ valueKey, labelKey }) => (
            <motion.div
              key={valueKey}
              variants={scaleIn}
              className="flex flex-col gap-1"
            >
              <span className="text-gradient text-3xl font-bold">
                {t(valueKey)}
              </span>
              <span className="text-sm text-muted-foreground">
                {t(labelKey)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
