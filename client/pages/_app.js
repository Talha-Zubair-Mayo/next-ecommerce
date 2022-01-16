import { useEffect } from "react";
import createStore from "../src/Redux/Store";
import "../styles/globals.css";
import { Provider } from "react-redux";
const { store } = createStore();
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        draggable={false}
        closeOnClick={false}
        pauseOnHover={false}
        limit={3}
      />
    </Provider>
  );
}

export default MyApp;
