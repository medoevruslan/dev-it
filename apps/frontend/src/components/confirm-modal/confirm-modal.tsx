import { Modal } from '@/src/components/ui/modal';
import { Typography } from '@/src/components/ui/typography';
import { Button } from '@/src/components/ui/button';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  handleDeleteCard: () => void;
};
export const ConfirmModal = ({
  closeModal,
  isOpen,
  handleDeleteCard,
}: Props) => {
  return (
    <Modal onClose={closeModal} open={isOpen} title={'Delete confirmation'}>
      <Typography className={'mb-4'} variant={'body1'}>
        Are you sure delete this card?
      </Typography>
      <div className={'flex justify-between mb-4'}>
        <Button onClick={closeModal} type={'button'} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={handleDeleteCard} type={'button'} variant={'primary'}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
