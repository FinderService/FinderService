import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

import { Toaster } from "react-hot-toast";

export default function Layout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <main className="w-full h-screen">
        <Navbar />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{
            position: "relative",
          }}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#fff",
              color: "#363636",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "white",
              },
            },
          }}
        />
        {/* <!-- Cambio de prueba --> */}
        {children}
      </main>
    </SessionProvider>
  );
}
