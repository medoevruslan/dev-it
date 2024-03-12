import { useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Modal } from '@/src/components/ui/modal';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { useGetArticleByIdQuery } from '@/src/services/articles/articles.service';
import { useEffect } from 'react';

const editArticleSchema = z.object({
  title: z.string().trim().min(1),
});

export type EditArticleFormValues = z.infer<typeof editArticleSchema>;

export const ArticleModal = ({
  isOpen,
  onSubmit,
  setIsOpen,
  articleId = '',
}: {
  isOpen: boolean;
  onSubmit: (articleId: string, data: EditArticleFormValues) => void;
  setIsOpen: (value: boolean) => void;
  articleId?: string;
}) => {
  const { data: article } = useGetArticleByIdQuery(
    { articleId },
    { skip: !articleId }
  );
  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const {
    control,
    formState: { errors, defaultValues },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<EditArticleFormValues>({
    defaultValues: {
      title: article?.title || '',
    },
    resolver: zodResolver(editArticleSchema),
  });
  const onFormSubmit = (data: EditArticleFormValues) => {
    onSubmit(articleId, data);
    closeModal();
  };

  useEffect(() => {
    if (!article) return;
    setValue('title', article?.title);
  }, [article]);

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
