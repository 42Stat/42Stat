import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { requestUserSearch } from '../api/requestUserSearch';
import { useDebounce } from './useDebounce';

export const useDebounceUserSearch = (input: string) => {
  const debounceSearch = useDebounce(() => setEnableQuery(true), 300);
  const [enableQuery, setEnableQuery] = React.useState(false);
  const userSearchQuery = useQuery({
    queryKey: ['user', 'search', { login: input, page: 1 }],
    queryFn: requestUserSearch,
    enabled: enableQuery && input !== '',
  });

  React.useEffect(() => {
    if (isSearchDone(userSearchQuery.data, userSearchQuery.isFetching)) {
      setEnableQuery(false);
    }
  }, [userSearchQuery.data, userSearchQuery.isFetching]);

  return { userSearchQuery, debounceSearch } as const;
};

const isSearchDone = (data: unknown, isFetcing: boolean) => {
  return data !== undefined && !isFetcing;
};
