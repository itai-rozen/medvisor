import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import { Provider } from './components/Context'
import Navbar from './components/Navbar/Navbar';
import Organizer from './pages/Organizer/Organizer';

function App() {

  const [drugList, setDrugList] = useState([])

  const getMeds = async () => {
    const result = await axios.get('/api')
    setDrugList(result.data)
  }

  useEffect(() => {
    getMeds()
  }, [])
  return <Provider value={
    {
      drugList,
      actions: {

      }
    }
  }>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Organizer />} />
      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App;
