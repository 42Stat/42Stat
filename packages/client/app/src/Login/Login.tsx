import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../AppRouter';
import { LoadingSpinner } from '../LoadingSpinner';
import { LoginMenuContainer } from './components/LoginMenuConatiner';
import { originalDestinationAtom } from '../AuthManager/atoms/originalDestinationAtom';
import { useLoginQuery } from './hooks/useLoginQuery';

export const Loign = () => {
  // enabled when Google Credential is set.
  const loginQuery = useLoginQuery();
  const originalDestination = useAtomValue(originalDestinationAtom);

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
  return <Navigate to={selectNavigatePath(originalDestination)} />;
};

const selectNavigatePath = (originalDestination: string | null) => {
  return originalDestination !== null ? originalDestination : RouteList.ROOT;
};
