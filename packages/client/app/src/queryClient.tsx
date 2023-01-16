import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
});
