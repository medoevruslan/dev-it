import React from 'react';
import { Icon } from '../icon';

const downIcon = <Icon name={'chevron-down'} width={15} height={5} />;
const upIcon = <Icon name={'chevron-up'} width={15} height={5} />;
const noneIcon = <Icon name={'sort-default'} width={10} height={10} />;

export type SortProps = {
  sort: string;
  value: string;
  onChange: (newSort: string) => void;
};

export const pureChange = (sort: string, down: string, up: string) => {
  return sort === down ? up : sort === up ? '' : down;
};

export const Sort = ({ sort, value, onChange }: SortProps) => {
  const up = value + '-asc';
  const down = value + '-desc';

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up));
  };

  const IconComponent =
    sort === down ? downIcon : sort === up ? upIcon : noneIcon;

  return (
    <div
      className={'inline-block cursor-pointer ml-3'}
      onClick={onChangeCallback}
    >
      {IconComponent}
    </div>
  );
};
