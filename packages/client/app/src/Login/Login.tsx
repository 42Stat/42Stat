import { Navigate } from 'react-router-dom';
import { RouteList } from '../App';
import { LoadingSpinner } from '../LoadingSpinner';
import { LoginMenu } from './components/LoginMenu';
import { useLoginQuery } from './hooks/useLoginQuery';

export const Login = () => {
  // enabled when Google Credential is set.
  const loginQuery = useLoginQuery();

  if (loginQuery.isLoading) {
    if (loginQuery.isFetching) {
      return <LoadingSpinner />;
    }

    return <LoginMenu />;
  }

  if (loginQuery.isError) {
    throw loginQuery.error;
  }

  // login success after here
  return <Navigate to={RouteList.ROOT} />;
};
