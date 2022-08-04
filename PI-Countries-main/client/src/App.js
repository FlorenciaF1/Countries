import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import ActivitiesCreate from './components/ActivitiesCreate';
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:cca3' element={<Detail />} />
          <Route path='/activities' element={<ActivitiesCreate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;