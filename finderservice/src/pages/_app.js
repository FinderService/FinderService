import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '@context/UserContext'
import { useRouter } from 'next/router'
import { WorkersProvider } from '@context/WorkersContext'


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  
  const handleAction = () =>{
    localStorage.setItem('redirectUrl', router.asPath);
    alert("Usuario: Debe iniciar sesión o registrarse para realizar esta acción.")
    router.push('/User/login');
  }

  return (
  <SessionProvider session={ session }>
    <UserProvider>
      <WorkersProvider>
        <Component handleAction={handleAction} {...pageProps} />
      </WorkersProvider>
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





