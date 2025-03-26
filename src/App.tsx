import { unstable_HistoryRouter as Router } from 'react-router-dom';
import Footer from '@/components/Footer';
import RouteRender from '@/routers/RouteRender';
import history from '@/utils/history';
const App = () => {
  return (
    <>
      <Router history={history}>
        <RouteRender />
        <Footer />
      </Router>
    </>
  );
};
export default App;
