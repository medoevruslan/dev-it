import { Router } from './router';
import { Layout } from './components/layout/layout';
import { Provider } from 'react-redux';
import { store } from '@/src/services/store';

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
