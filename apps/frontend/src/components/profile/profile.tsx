import clsx from 'clsx';

import { Typography } from '@/src/components/ui/typography';

type Props = {
  className?: string;
  email?: string;
  imageSrc?: string;
  name: string;
};

export const Profile = ({ className = '', email, imageSrc, name }: Props) => {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <img
        className={'w-9 max-w-full h-auto'}
        alt={email || name}
        src={imageSrc}
      />
      <div>
        <Typography variant={'subtitle2'}>{name}</Typography>
        {email && (
          <Typography className={'text-dark-100'} variant={'caption'}>
            {email}
          </Typography>
        )}
      </div>
    </div>
  );
};
