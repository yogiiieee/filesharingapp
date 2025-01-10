import './App.css'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Table from './components/Table';
import Profile from './components/Profile';

function App() {
  const fileData = [
    {
      name: 'big_win.jpeg',
      date: '23 May 2019',
      size: 100,
      actions: 'download' as 'download',
      sharing: false
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Table data={fileData}/>} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
