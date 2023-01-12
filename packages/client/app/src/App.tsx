import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './AppRouter';
import { GlobalStyle } from './styles/GlobalStyle';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>asdf</div>
      {/* <GlobalStyle />
      <AppRouter /> */}
    </QueryClientProvider>
  );
}

export default App;
