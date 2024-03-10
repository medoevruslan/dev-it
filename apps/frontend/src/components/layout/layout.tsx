import { ToastContainer } from 'react-toastify';

import { Header } from './header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <ToastContainer />
      {children}
    </>
  );
};
