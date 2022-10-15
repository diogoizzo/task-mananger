import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';

export default function Proximas<NextPage>() {
   return (
      <Menu>
         <h1>Proximas!</h1>
      </Menu>
   );
}

Proximas.auth = true;
