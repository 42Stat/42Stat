import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle } from './styles/GlobalStyle';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const RouteList = {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  FTOAUTH: '/ftoauth',
  PROFILE: '/profile',
} as const;

// if use react-router-dom's loader, QueryClient is needed here.
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
