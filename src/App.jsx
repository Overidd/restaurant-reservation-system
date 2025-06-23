
import { Provider } from 'react-redux';
import { store } from './doman/store';
import { RouterApp } from './router';

const App = () => {
   return (
      <Provider store={store}>
         <RouterApp />
      </Provider>
   )
}

export default App