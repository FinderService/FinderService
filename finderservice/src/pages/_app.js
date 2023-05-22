import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '@context/UserContext'
import { HomeEmployerProvider } from '@context/HomeEmployerContext'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
  <SessionProvider session={ session }>
    <UserProvider>
      <HomeEmployerProvider>
      <Component {...pageProps} />
      </HomeEmployerProvider>
    </UserProvider>
  </SessionProvider>
  )
} 



 
/*
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducer";

const store = createStore(rootReducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
*/





