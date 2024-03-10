import { SVGProps } from 'react';

import spriteHref from '../../../assets/icons/sprite.svg';

type Props = {
  name: string;
} & SVGProps<SVGSVGElement>;
export const Icon = ({ name, ...props }: Props) => {
  return (
    <svg className={'inline-block'} {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
};
