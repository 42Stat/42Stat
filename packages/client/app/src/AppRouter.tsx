import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { Login } from './Login/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<Navigate to="/login" replace={true} />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export const AppRouter: React.FC = (): React.ReactElement => {
  return <RouterProvider router={router} />;
};
