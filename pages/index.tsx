import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';

export default function Dashboard<NextPage>() {
   return (
      <Menu>
         <h1>Dashboard</h1>
      </Menu>
   );
}

Dashboard.auth = true;
