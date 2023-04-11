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
        <Image src={logo} alt="edreams logo" width={107} height={24} />
      </header>
      <main className={styles.Main}>{children}</main>
      <footer className={styles.Footer}>
        <Image src={logo} alt="edreams logo" width={170} />
        <span className={styles.FooterText}>
          Front-end Challange, Filippo Rivolta. Not a company website.
        </span>
      </footer>
    </>
  );
};

export default Layout;
