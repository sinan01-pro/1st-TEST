import { useToast } from '@/stores/useToast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const borderColors = {
  success: 'border-l-emerald-500',
  error: 'border-l-red-500',
  info: 'border-l-warmgray',
};

export default function Toast() {
  const { toasts, remove } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`bg-obsidian text-ivory pl-4 pr-10 py-4 border-l-4 ${borderColors[toast.type]} shadow-lg min-w-[280px] relative`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="flex-shrink-0" />
                <span className="text-sm font-sans">{toast.message}</span>
              </div>
              <button
                onClick={() => remove(toast.id)}
                className="absolute top-3 right-3 text-warmgray hover:text-ivory transition-colors"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
