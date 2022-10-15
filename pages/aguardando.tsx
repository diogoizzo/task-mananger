import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';

export default function Aguardando<NextPage>() {
   return (
      <Menu>
         <h1>Aguardando!</h1>
      </Menu>
   );
}

Aguardando.auth = true;
