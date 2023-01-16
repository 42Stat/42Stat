import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { AppRouter } from './AppRouter';
import { queryClient } from './queryClient';
import { GlobalStyle } from './styles/GlobalStyle';

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
