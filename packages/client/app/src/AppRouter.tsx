import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthManager } from './AuthManager/AuthManager';
import { Loign } from './Login/Login';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { FTOAuth } from './FTOAuth/FTOAuth';
import { Profile } from './Profile/Profile';

export const RouteList = {
  ROOT: '/',
  LOGIN: '/login',
  FTOAUTH: '/ftoauth',
  PROFILE: '/profile',
} as const;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RouteList.ROOT} errorElement={<ErrorPage />}>
      <Route path={RouteList.LOGIN} element={<Loign />} />
      <Route path={RouteList.FTOAUTH} element={<FTOAuth />} />
      <Route element={<AuthManager />}>
        <Route index element={<Navigate to={RouteList.PROFILE} />} />
        <Route path={RouteList.PROFILE} element={<Profile />} />
      </Route>
    </Route>
  )
);

export const AppRouter: React.FC = (): React.ReactElement => {
  return <RouterProvider router={router} />;
};
