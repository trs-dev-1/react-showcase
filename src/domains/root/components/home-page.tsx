import { Container } from '@/shared/components/ui/container';
import { fadeInUp } from '@/shared/lib/animations';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CategoriesSection } from './categories-section/categories-section';
import { HeroSection } from './hero-section/hero-section';
import { OverviewSuggestionsGrid } from './overview-suggestions-grid/overview-suggestions-grid';
import { RecentlyAddedSection } from './recently-added-section/recently-added-section';
import { StatsSection } from './stats-section/stats-section';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <Container>
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-10 pb-4 text-2xl font-semibold"
        >
          {t('promoted-ads')}
        </motion.h2>
        <OverviewSuggestionsGrid />
      </Container>
      <RecentlyAddedSection />
    </div>
  );
}
