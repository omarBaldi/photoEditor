import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';

ReactDOM.render(
  <Provider {...{ store }}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
