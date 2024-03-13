import z from 'zod';

export const editArticleSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  author: z.string().optional(),
});

export type EditArticleFormValues = z.infer<typeof editArticleSchema>;
