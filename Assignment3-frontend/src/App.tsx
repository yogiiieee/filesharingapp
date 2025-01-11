import './App.css'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

function App() {
  const fileData = [
    {
      name: 'big_win.jpeg',
      date: '23 May 2019',
      size: 100,
      actions: 'delete' as 'delete',
      sharing: false
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard data={fileData}/>} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
