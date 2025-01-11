import './App.css'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import StandAlone from './components/Standalone';

function App() {
  const fileData = [
    {
      name: 'big_win.jpeg',
      date: '23 May 2019',
      size: 100,
      actions: 'delete' as 'delete',
      sharing: false,
    },
  ];
  const fileData2 = [
    {
      name: 'big_win.jpeg',
      date: '23 May 2019',
      size: 100,
      actions: 'download' as 'download',
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard data={fileData}/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/file' element={<StandAlone data={fileData2} />} />
      </Routes>
    </Router>
  )
}

export default App
