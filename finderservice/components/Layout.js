import Navbar from "./Navbar";

import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
            position: 'relative'
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
      {children}
    </main>
  );
}
