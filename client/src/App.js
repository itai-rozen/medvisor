import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import { Provider } from './components/Context'
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import { getToken, onMessageListener } from './firebase';
import Auth from './pages/Auth/Auth';
import DrugList from './pages/DrugList/DrugList';

function App() {

  const [drugList, setDrugList] = useState([])
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  const [test, setTest] = useState('hi')
  const [loggedUser, setLoggedUser] = useState({})


  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));
  const messagingFirebase =  () => {
    getToken(setTokenFound)
  }

  const getMeds = async () => {
    const result = await axios.get('/api')
    setDrugList(result.data)
  }

  useEffect(() => {
    // getMeds()
    // getToken(setTokenFound)
    messagingFirebase()
  }, [])
  return <Provider value={
    {
      drugList ,
      test ,
      loggedUser,
      actions: {
        setLoggedUser
      }
    }
  }>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/drugs" element={<DrugList />} />
      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App;
