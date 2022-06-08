import './App.scss';

import { Header } from './components/Header/Header';
import { AppRouter } from './routers/AppRouter';

function App() {
  return (
    <div className='app'>
      <Header className='app__header'/>
      <AppRouter className='app__content'/>
    </div>
  )
}

export default App;
