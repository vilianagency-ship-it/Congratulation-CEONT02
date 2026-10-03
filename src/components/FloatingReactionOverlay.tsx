import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface FloatingItem {
  id: string;
  emoji: string;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  rotate: number;
  scale: number;
  duration: number;
}

interface FloatingReactionOverlayProps {
  items: FloatingItem[];
  onRemoveItem: (id: string) => void;
}

export const FloatingReactionOverlay: React.FC<FloatingReactionOverlayProps> = ({
  items,
  onRemoveItem,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 1,
              x: item.startX,
              y: item.startY,
              scale: 0.4,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0.8, 0],
              x: item.startX + item.deltaX,
              y: item.startY - item.deltaY,
              scale: [0.4, item.scale, item.scale * 1.1, item.scale * 0.9],
              rotate: item.rotate,
            }}
            transition={{
              duration: item.duration,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onAnimationComplete={() => onRemoveItem(item.id)}
            className="absolute top-0 left-0 text-2xl sm:text-3xl select-none filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
