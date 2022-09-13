import { useSession } from 'next-auth/react';

export default function LoggedIn() {
   return (
      <div>
         <h1>Você esta logado!</h1>
      </div>
   );
}

LoggedIn.auth = true;
