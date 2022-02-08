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
import AddDrug from './pages/AddDrug/AddDrug';


function App() {

  const [drugList, setDrugList] = useState([])
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  const [loggedUser, setLoggedUser] = useState({})
  const [isSignup, setIsSignup] = useState(false)



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
    getMeds()
    // getToken(setTokenFound)
    // messagingFirebase()
    
  }, [])
  return <Provider value={
    {
      isSignup,
      drugList ,
      loggedUser,
      actions: {
        setLoggedUser
      }
    }
  }>
    <BrowserRouter>
      <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} setIsSignup={setIsSignup} />
      <Routes>
        <Route path="/" element={<About setIsSignup={setIsSignup} />} />
        <Route path="/auth" element={<Auth setLoggedUser={setLoggedUser} isSignup={isSignup} setIsSignup={setIsSignup} />} />
        <Route path="/drugs" element={<DrugList loggedUser={loggedUser} />} />
        <Route path="/addDrug" element={<AddDrug drugList={drugList} loggedUser={loggedUser} />} />
      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App;
