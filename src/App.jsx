import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/Homepage'

function App() {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/person/:id" element={<PersonQuotesPage />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
