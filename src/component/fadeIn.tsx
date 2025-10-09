import { motion } from "framer-motion";

export const FadeIn = ({ delay = 0, children, y = 12 }: { delay?: number; children: React.ReactNode; y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);