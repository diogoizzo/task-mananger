import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';

export default function Projetos<NextPage>() {
   return (
      <Menu>
         <h1>Projetos!</h1>
      </Menu>
   );
}

Projetos.auth = true;
