import "../styles/global.scss";

import { Header } from "../components/Header";
import { CartContextProvider } from "../contexts/CartContext";

import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
      </div>
    </CartContextProvider>
  );
}

export default MyApp;
