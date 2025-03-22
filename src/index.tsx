import '@/assets/css/common.less';
import 'lib-flexible';
import { render } from 'react-dom';
import App from '@/App';
import { setWindowHeight } from './utils';
setWindowHeight();
window.onresize = () => {
  setWindowHeight();
};
render(<App />, document.getElementById('root'));
