import { CSSProperties } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogProps,
  DialogTitle,
} from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { Typography } from '@/src/components/ui/typography';
import { Icon } from '../icon';

export type ModalProps = {
  className?: string;
  onClose?: () => void;
  style?: CSSProperties;
  title?: string;
} & Omit<DialogProps, 'modal'>;

const dropIn = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
    y: '100vh',
  },
  hidden: {
    opacity: 0,
    x: '-50%',
  },
  visible: {
    opacity: 1,
    transition: {
      damping: 25,
      duration: 0.3,
      ease: 'easeIn',
      stiffness: 300,
      type: 'spring',
    },
    y: '-50%',
  },
};

export const Modal = ({
  children,
  className,
  onClose,
  open = false,
  style,
  title,
}: ModalProps) => {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <AnimatePresence>
        {open && (
          <DialogPortal forceMount>
            <DialogOverlay asChild className={'fixed inset-0 bg-black/90'}>
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={'overlay'}
              />
            </DialogOverlay>
            <DialogContent
              className={clsx('fixed left-1/2 top-1/2', className)}
              forceMount
            >
              <motion.div
                animate={'visible'}
                exit={'exit'}
                initial={'hidden'}
                key={'content'}
                variants={dropIn}
              >
                <section
                  className={
                    'min-w-[368px] max-w-[764px] w-full bg-dark-700 border border-solid border-dark-500 '
                  }
                  style={style}
                >
                  <header
                    className={
                      'flex justify-between items-center border-b border-solid border-dark-500 py-4 px-6'
                    }
                  >
                    {title && (
                      <DialogTitle asChild>
                        <Typography variant={'h3'}>{title}</Typography>
                      </DialogTitle>
                    )}
                    <DialogClose>
                      <Icon
                        aria-label={'close'}
                        className={'cursor-pointer'}
                        height={12}
                        name={'close'}
                        width={12}
                      />
                    </DialogClose>
                  </header>
                  <article className={'py-4 px-6'}>{children}</article>
                </section>
              </motion.div>
            </DialogContent>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  );
};
