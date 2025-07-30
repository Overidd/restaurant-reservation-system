import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './doman/store';
import { RouterApp } from './router';
AOS.init();

const App = () => {
   return (
      <Provider store={store}>
         <RouterApp />
         <Toaster
            reverseOrder={true}
            position="top-right"
            toastOptions={{
               style: {
                  background: '#FAF3E6',
                  color: '#4e403cc4',
               },
            }}
            containerStyle={{
               padding: '16px',
            }}
         />
      </Provider>
   )
}

export default App