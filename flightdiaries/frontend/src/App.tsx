
import { NavLink, Route, Routes } from 'react-router'
import styles from './App.module.css'
import { Diaries } from './components/diaries/diaries.component'

function App() {
  

  return (
    <>
      <nav className= {styles['nav-panel']}>
        <NavLink to="/" end>
          Diariesd
        </NavLink>
      </nav>
      
      <Routes>
        <Route index element={<Diaries />} />
      </Routes>
      
    </>
  )
}

export default App
