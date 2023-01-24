import { Navigate } from 'react-router-dom';
import { RouteList } from '../App';
import { LoadingSpinner } from '../LoadingSpinner';
import { LoginMenuContainer } from './components/LoginMenuConatiner';
import { useLoginQuery } from './hooks/useLoginQuery';

export const Login = () => {
  // enabled when Google Credential is set.
  const loginQuery = useLoginQuery();

  if (loginQuery.isLoading) {
    if (loginQuery.isFetching) {
      return <LoadingSpinner />;
    }

    return <LoginMenuContainer />;
  }

  if (loginQuery.isError) {
    throw loginQuery.error;
  }

  // login success after here
  return <Navigate to={RouteList.ROOT} />;
};
