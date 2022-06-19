import './App.scss';

import { AppRouter } from './routers/AppRouter';

function App() {
  return (
    <div className='app'>
      <AppRouter className='app__content'/>
    </div>
  )
}

export default App;
