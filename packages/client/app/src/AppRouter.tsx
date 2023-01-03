import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ErrorPage } from './views/ErrorPage';
import { Login } from './views/Login';
import { Root } from './views/Root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to="/login" replace={true} />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export const AppRouter: React.FC = (): React.ReactElement => {
  return <RouterProvider router={router} />;
};
