import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '@context/UserContext'
import { HomeEmployerProvider } from '@context/HomeEmployerContext'
import { useRouter } from 'next/router'
import { WorkersProvider } from '@context/WorkersContext'
import { AdminProvider } from '@context/AdminContext'
import { usePostulations } from '@context/JobpostulationsContext';
import { useJobRequests } from '@context/JobrequestsContext';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const { jobPostulations, addJobPostulations } = usePostulations();
  const { jobRequests, addJobRequests } = useRequests();

  const handleAction = () =>{
    localStorage.setItem('redirectUrl', JSON.stringify(router.asPath));
    alert("Usuario: Debe iniciar sesión o registrarse para realizar esta acción.")
    router.push('/User/login');
  }

  return (
  <SessionProvider session={ session }>
    <UserProvider>
        <JobpostulationsContext.Provider value={{ jobPostulations, addJobPostulations }}>
          <Component handleAction={handleAction} {...pageProps} />
        </JobpostulationsContext.Provider>
        <JobRequestsContext.Provider value={{ jobRequests, addJobRequests }}>
          <Component handleAction={handleAction} {...pageProps} />
        </JobRequestsContext.Provider>
      <AdminProvider>
        <HomeEmployerProvider>
          <WorkersProvider>
            <Component handleAction={handleAction} {...pageProps} />
          </WorkersProvider>
        </HomeEmployerProvider>
      </AdminProvider>
    </UserProvider>
  </SessionProvider>
  )
} 



 





