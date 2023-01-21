import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Login } from './Login/Login';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { Profile } from './Profile/Profile';
import { FtOAuth } from './FtOAuth/FtOAuth';
import { RouteGuard } from './RouteGuard/RouteGuard';
import { Logout } from './Logout/Logout';

export const RouteList = {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  FTOAUTH: '/ftoauth',
  PROFILE: '/profile',
} as const;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RouteList.ROOT} errorElement={<ErrorPage />}>
      <Route element={RouteGuard.NeedNoLogin}>
        <Route path={RouteList.LOGIN} element={<Login />} />
      </Route>
      <Route element={RouteGuard.NeedNoFtOAuth}>
        <Route path={RouteList.FTOAUTH} element={<FtOAuth />} />
      </Route>
      <Route element={RouteGuard.NeedAuth}>
        <Route index element={<Navigate to={RouteList.PROFILE} />} />
        <Route path={RouteList.PROFILE} element={<Profile />} />
      </Route>
      <Route path={RouteList.LOGOUT} element={<Logout />} />
    </Route>
  )
);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
