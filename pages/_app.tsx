import "../styles/globals.css";
import "antd/dist/antd.min.css";

import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import { MainLayout } from "../components/MainLayout/MainLayout";
import { store } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout user={pageProps.user}>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
