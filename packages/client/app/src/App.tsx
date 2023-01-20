import { QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './AppRouter';
import { queryClient } from './queryClient';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
