import { PropertyListMock } from '@/domains/search';
import { Button } from '@/shared/components/ui/button';
import { Container } from '@/shared/components/ui/container';
import { Separator } from '@/shared/components/ui/separator';
import { fadeInUp } from '@/shared/lib/animations';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { OverviewSuggestionsGrid } from '../overview-suggestions-grid/overview-suggestions-grid';

export const RecentlyAddedSection = () => {
  const { t } = useTranslation();

  return (
    <Container className="pb-10">
      <Separator className="mb-8" />
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-4 flex items-center justify-between"
      >
        <h2 className="text-2xl font-semibold">{t('recently-added')}</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/search/list">{t('view-all')}</Link>
        </Button>
      </motion.div>
      <OverviewSuggestionsGrid
        properties={[...PropertyListMock].reverse()}
      />
    </Container>
  );
};
