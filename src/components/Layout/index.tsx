import { FC, ReactNode } from "react";
import Head from "next/head";
import styles from "./index.module.scss";
import Image, { StaticImageData } from "next/image";

interface LayoutProps {
  children: ReactNode;
  logo: StaticImageData;
}
const Layout: FC<LayoutProps> = ({ children, logo }) => {
  return (
    <>
      <Head>
        <title>Odigeo Front-end Challange - Search</title>
      </Head>
      <header className={styles.NavBar}>
        <Image src={logo} alt="Picture of the author" width={107} height={24} />
      </header>
      <main className={styles.Main}>{children}</main>
    </>
  );
};

export default Layout;
