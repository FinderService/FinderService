import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '@context/UserContext';
import { HomeEmployerProvider } from '@context/HomeEmployerContext';
import { useRouter } from 'next/router';
import { WorkersProvider } from '@context/WorkersContext';
import { AdminProvider } from '@context/AdminContext';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  const handleAction = () => {
    localStorage.setItem('redirectUrl', JSON.stringify(router.asPath));
    alert('Usuario: Debe iniciar sesión o registrarse para realizar esta acción.');
    router.push('/User/login');
  };

  return (
    <SessionProvider session={session}>
      <UserProvider>
            <AdminProvider>
              <HomeEmployerProvider>
                <WorkersProvider>
                  <Component handleAction={handleAction} {...pageProps} />
                </WorkersProvider>
              </HomeEmployerProvider>
            </AdminProvider>
      </UserProvider>
    </SessionProvider>
  );
}
