import { CheckAuth } from './components/CheckAuth';
import { CheckNoFtOAuth } from './components/CheckNoFtOAuth';
import { CheckNoLogin } from './components/CheckNoLogin';

export const RouteGuard = {
  NeedAuth: <CheckAuth />,
  NeedNoLogin: <CheckNoLogin />,
  NeedNoFtOAuth: <CheckNoFtOAuth />,
} as const;
