import { CheckNoLogin } from './components/CheckNoLogin';
import { CheckNoFtOAuth } from './components/CheckNoFtOAuth';
import { CheckAuth } from './components/CheckAuth';

export const RouteGuard = {
  NeedAuth: <CheckAuth />,
  NeedNoLogin: <CheckNoLogin />,
  NeedNoFtOAuth: <CheckNoFtOAuth />,
} as const;
