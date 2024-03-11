import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ArticleList } from '@/src/pages/article-list';
import { Signin } from '@/src/pages/signin';
import { Signup } from '@/src/pages/signup';
import { useMeQuery } from '@/src/services/auth/auth.service';

const PrivateRoutes = () => {
  const { isError, isLoading } = useMeQuery();
  const isAuthenticated = !isError && !isLoading;

  if (isLoading) {
    return 'loading';
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
};

const RedirectToMainWhenUserSignedIn = () => {
  const { isError, isLoading } = useMeQuery();

  const shouldNavigateToMain = !isError && !isLoading;

  if (isLoading) {
    return 'loading';
  }

  return shouldNavigateToMain ? <Navigate to={'/'} /> : <Outlet />;
};

//@ts-ignore
const publicRoutes = [];
const privateRoutes = [
  {
    element: <ArticleList />,
    path: '/',
  },
];

const signInCheck = {
  children: [
    {
      element: <Signin />,
      path: '/login',
    },
    {
      element: <Signup />,
      path: '/signup',
    },
  ],
  element: <RedirectToMainWhenUserSignedIn />,
};

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  signInCheck,
  //@ts-ignore
  ...publicRoutes,
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
