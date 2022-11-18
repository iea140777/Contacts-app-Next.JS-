import Head from "next/head";

import { Spin } from "antd";

import { selectLoader } from "../../store/loaderSlice";
import { useAppSelector } from "../../utils/hooks";
import { User } from "../../utils/types";
import { Navigation } from "../Navigation/Navigation";

interface MainLayoutProps {
  children: React.ReactNode;
  user: User;
}

export function MainLayout({ children, user }: MainLayoutProps) {
  const { isLoading } = useAppSelector(selectLoader);
  return (
    <>
      <Head>
        <title> Contacts</title>
        <meta
          name="keywords"
          content="next,typescript,nextjs,react, contacts"
        />
        <meta name="description" content="this is test app with nextJS" />
        <meta charSet="utf-8" />
        <meta lang="en" />
      </Head>
      <main>
        <Navigation user={user} />
        <Spin spinning={isLoading}>{children}</Spin>
      </main>
    </>
  );
}
