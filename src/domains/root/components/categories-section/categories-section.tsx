import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from '@/shared/constants/property.constants';
import { Container } from '@/shared/components/ui/container';
import { fadeInUp, staggerContainerMedium } from '@/shared/lib/animations';
import { IconBuilding, IconHome } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CategoryCard } from './category-card';

const CATEGORIES = [
  {
    titleKey: 'apartments-for-rent',
    countKey: 'category-count-apartments-rent',
    icon: <IconBuilding className="size-6 text-primary" />,
    propertyType: PROPERTY_TYPE.APARTMENT,
    relationType: RELATION_TYPE.RENT
  },
  {
    titleKey: 'apartments-for-sale',
    countKey: 'category-count-apartments-sell',
    icon: <IconBuilding className="size-6 text-primary" />,
    propertyType: PROPERTY_TYPE.APARTMENT,
    relationType: RELATION_TYPE.SELL
  },
  {
    titleKey: 'houses-for-rent',
    countKey: 'category-count-houses-rent',
    icon: <IconHome className="size-6 text-primary" />,
    propertyType: PROPERTY_TYPE.HOUSE,
    relationType: RELATION_TYPE.RENT
  },
  {
    titleKey: 'houses-for-sale',
    countKey: 'category-count-houses-sell',
    icon: <IconHome className="size-6 text-primary" />,
    propertyType: PROPERTY_TYPE.HOUSE,
    relationType: RELATION_TYPE.SELL
  }
];

export const CategoriesSection = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-10">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-6 text-2xl font-semibold"
      >
        {t('browse-by-category')}
      </motion.h2>
      <motion.div
        variants={staggerContainerMedium}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {CATEGORIES.map((category) => (
          <motion.div
            key={category.titleKey}
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            <CategoryCard {...category} />
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};
