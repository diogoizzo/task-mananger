import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';

export default function Configurcoes<NextPage>() {
   return (
      <Menu>
         <h1>Configurações!</h1>
      </Menu>
   );
}

Configurcoes.auth = true;
