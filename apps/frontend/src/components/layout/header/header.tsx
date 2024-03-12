import { ComponentProps } from 'react';
import { Container } from '@/src/components/container/container';
import UserImage from '@/src/assets/person-outline.svg';
import {
  useLogoutMutation,
  useMeQuery,
} from '@/src/services/auth/auth.service';
import { Typography } from '@/src/components/ui/typography';
import { Button } from '@/src/components/ui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownItemSeparator,
} from '@/src/components/ui/dropdown';
import { Profile } from '@/src/components/profile';
import { Icon } from '@/src/components/ui/icon';

export const Header = ({
  children,
  className,
  ...rest
}: ComponentProps<'header'>) => {
  const { data: user, isError } = useMeQuery();
  const [logout] = useLogoutMutation();

  return (
    <header className="w-full bg-dark-700 border-b border-b-dark-500 px-[12px] py-2">
      <Container>
        <div className={'flex items-center justify-between'}>
          <Typography variant={'h2'}>Header Logo</Typography>
          {user && !isError ? (
            <div className={'items-center cursor-pointer flex gap-4'}>
              <Typography
                className={'border-b border-dashed border-light-100'}
                variant={'subtitle1'}
              >
                {user.username ?? 'user'}
              </Typography>
              <Dropdown
                headerItem={
                  <Profile
                    email={user.email || '@email'}
                    imageSrc={UserImage}
                    name={user.username}
                  />
                }
                rootTrigger={
                  <img
                    alt={'open dropdown'}
                    aria-label={'open dropdown'}
                    role={'button'}
                    src={UserImage}
                    width={'36px'}
                  />
                }
              >
                <DropdownItem>
                  <a href={'#'}>
                    <Icon height={20} name={'person-outline'} width={20} />
                    My Profile
                  </a>
                </DropdownItem>
                <DropdownItemSeparator />
                <DropdownItem onSelect={() => logout()}>
                  <div className={'cursor-pointer'}>
                    <Icon height={20} name={'log-out'} width={20} />
                    Logout
                  </div>
                </DropdownItem>
              </Dropdown>
            </div>
          ) : (
            <Button as={'a'} href={'/login'} variant={'primary'}>
              Sign In
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};
