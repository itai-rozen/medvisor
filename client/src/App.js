import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { Provider } from './components/Context'
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import Auth from './pages/Auth/Auth';
import DrugList from './pages/DrugList/DrugList';
import ReminderList from './pages/ReminderList/ReminderList';
import './App.css';
import Footer from './components/Footer/Footer';



function App() {

  const [drugList, setDrugList] = useState([])
  const [drugStrs, setDrugStrs] = useState([])
  const [loggedUser, setLoggedUser] = useState({})
  const [isSignup, setIsSignup] = useState(true)
  const [reminders, setReminders] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)

  const getReminders = async () => {
    const { data } = await axios.get('/api/reminder')
    setReminders(data)
  }

  const getUser = async () => {
    if (loggedUser.email) {
      const { email } = loggedUser
      try {
        const { data } = await axios.post('/api/user', { email })
        console.log('data @getUser @App: ', data)
        setLoggedUser(data)
      } catch (err) {
        console.log(err)
      }
    }
  }



  const getMeds = async () => {
    try {
      const result = await axios.get('/api')
      setDrugList(result.data)
      spreadDrugObjs(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const spreadDrugObjs = drugList => {
    const drugs = []
    drugList.forEach((drugObj, index) => {
      for (let prop in drugObj) drugs.push(drugObj[prop])
    })
    const uniqueDrugs = [...new Set(drugs)]
    setDrugStrs(uniqueDrugs)
  }


  useEffect(() => {
    getMeds()
  }, [])

  useEffect(() => {
    getReminders()
  }, [loggedUser])

  return <Provider value={
    {
      isSignup,
      drugList,
      drugStrs,
      loggedUser,
      showAddModal,
      actions: {
        getUser,
        setLoggedUser,
        setShowAddModal
        
      }
    }
  }>
    <BrowserRouter>
      <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} setIsSignup={setIsSignup} />
      <Routes>
        <Route path="/" element={<About setIsSignup={setIsSignup} />} />
        <Route path="/auth" element={<Auth setLoggedUser={setLoggedUser} isSignup={isSignup} setIsSignup={setIsSignup} />} />
        <Route path="/drugs" element={<DrugList getUser={getUser} setLoggedUser={setLoggedUser} loggedUser={loggedUser} />} />
        <Route path="/reminders" element={<ReminderList getReminders={getReminders} reminders={reminders} loggedUser={loggedUser} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </Provider>
}

export default App;
