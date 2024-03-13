import { useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/src/components/ui/modal';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import {
  EditArticleFormValues,
  editArticleSchema,
} from '@/src/schema/article.schema';
import { Article } from '@/src/services/types';

export const ArticleModal = ({
  isOpen,
  onSubmit,
  setIsOpen,
  article,
}: {
  isOpen: boolean;
  onSubmit: (articleId: string, data: EditArticleFormValues) => void;
  setIsOpen: (value: boolean) => void;
  article?: Article;
}) => {
  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<EditArticleFormValues>({
    defaultValues: {
      title: article?.title || '',
    },
    resolver: zodResolver(editArticleSchema),
  });
  const onFormSubmit = (data: EditArticleFormValues) => {
    onSubmit(article?.id || '', data);
    closeModal();
  };

  return (
    <Modal onClose={closeModal} open={isOpen} title={'Edit Article'}>
      <form className={'w-[540px]'} onSubmit={handleSubmit(onFormSubmit)}>
        <DevTool control={control} />
        <Input
          {...register('title')}
          className={'w-full mb-5'}
          error={errors.title?.message}
          id={'title'}
          label={'Article Title'}
        />
        <div className={'flex items-center justify-between'}>
          <Button onClick={closeModal} type={'button'} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'} variant={'primary'}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
