import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { FtOAuth } from './FtOAuth/FtOAuth';
import { Login } from './Login/Login';
import { Logout } from './Logout/Logout';
import { Profile } from './Profile/Profile';
import { RouteGuard } from './RouteGuard/RouteGuard';
import { GlobalStyle } from './styles/GlobalStyle';

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
// https://tkdodo.eu/blog/react-query-meets-react-router
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
        <Route path={RouteList.PROFILE}>
          <Route
            index
            element={<Navigate to={`${RouteList.PROFILE}/me`} replace={true} />}
          />
          <Route path=":id" element={<Profile />} />
        </Route>
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
