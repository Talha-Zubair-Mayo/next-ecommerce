import { useEffect } from "react";
import createStore from "../src/Redux/Store";
import "../styles/globals.css";
import { Provider } from "react-redux";
const { store } = createStore();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;