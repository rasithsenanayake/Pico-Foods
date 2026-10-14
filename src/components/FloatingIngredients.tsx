import { motion, useReducedMotion } from 'framer-motion';
import { foodIllustrations } from './FoodIllustrations';
import type { Floater } from '../types/menu';

interface FloatingIngredientsProps {
  items: Floater[];
}

export function FloatingIngredients({ items }: FloatingIngredientsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {items.map((item, index) => {
        const Illustration = foodIllustrations[item.kind];
        const rotate = item.rotate ?? 0;
        return (
          <motion.div
            key={`${item.kind}-${index}`}
            className={`absolute ${item.className}`}
            initial={{ rotate, y: 0 }}
            animate={
            reduceMotion ?
            { rotate } :
            { y: [0, -14, 0], rotate: [rotate, rotate + 8, rotate] }
            }
            transition={{
              duration: item.duration ?? 6,
              delay: item.delay ?? 0,
              repeat: Infinity,
              ease: 'easeInOut'
            }}>

            <Illustration className="h-full w-full drop-shadow-[0_10px_12px_rgba(23,36,27,0.14)]" />
          </motion.div>);

      })}
    </div>);

}
