import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import ListView from './components';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <ListView />
    </div>
    </Provider>
  );
}

export default App;
