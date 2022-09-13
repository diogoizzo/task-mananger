import '../styles/globals.css';
import { useSession, SessionProvider } from 'next-auth/react';
import React from 'react';
import type { AppProps } from 'next/app';

function Auth(props: any) {
   // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
   const { status } = useSession({ required: true });

   if (status === 'loading') {
      return <div>Loading...</div>;
   }

   return props.children;
}

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
   return (
      //essa configuração faz com que basta colocar nomedocomponente.auth = true para fazer com que a página seja restrita
      <SessionProvider session={pageProps.session}>
         {Component.auth ? (
            <Auth>
               <Component {...pageProps} />
            </Auth>
         ) : (
            <Component {...pageProps} />
         )}
      </SessionProvider>
   );
}
