import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';

export default function Progresso<NextPage>() {
   return (
      <Menu>
         <h1>Progresso!</h1>
      </Menu>
   );
}

Progresso.auth = true;
