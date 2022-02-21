import SignInPage from './signin';
import { useAuth } from '../authentication';
import GoodsDashboard from './deliveryfleet/goods';
import { useRouter } from 'next/router';

const HomePage = () => {
  return <GoodsDashboard />;
};

export default HomePage;
