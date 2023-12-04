import Top from "./top";
import Left from "./left";
import Head from "next/head";

export default function Layout({ children, ...pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.pageTitle ? pageProps.pageTitle : "Loading..."} | Welcome to CRUD app</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Top pageTitle={pageProps.pageTitle} pageName={pageProps.pageName} />
        <div className="p-5">
          <main>
            {children}
          </main>
        </div>
      </>
    </>
  );
}
