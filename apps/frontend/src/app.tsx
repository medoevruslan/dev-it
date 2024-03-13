import { Router } from './router';
import { Layout } from './components/layout/layout';
import { Provider } from 'react-redux';
import { store } from '@/src/services/store';
import ErrorBoundary from '@/src/pages/error/error';

export function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Router />
      </Layout>
    </Provider>
  );
}

export default App;
