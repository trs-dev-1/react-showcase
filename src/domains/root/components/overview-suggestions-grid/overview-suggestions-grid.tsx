import { PropertyListMock } from '@/domains/search';
import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';
import { fadeInUp, staggerContainer } from '@/shared/lib/animations';
import { motion } from 'framer-motion';
import { OverviewSuggestionsGridItem } from '../overview-suggestions-grid-item/overview-suggestions-grid-item';

type OverviewSuggestionsGridProps = {
  properties?: PropertyTypeDef[];
};

export const OverviewSuggestionsGrid = ({
  properties = PropertyListMock
}: OverviewSuggestionsGridProps) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {properties.map((property) => (
        <motion.div
          key={property.id}
          variants={fadeInUp}
          whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
        >
          <OverviewSuggestionsGridItem property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
};
