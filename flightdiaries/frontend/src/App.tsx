
import { NavLink, Route, Routes } from 'react-router'
import styles from './App.module.css'
import { Diaries } from './components/diaries/diaries.component'
import { AddDiary } from './components/add-diary/add-diary.comptonent'

function App() {
  

  return (
    <>
      <nav className= {styles['nav-panel']}>
        <NavLink className={styles.navlink} to="/" end>
          Diaries
        </NavLink>
        <NavLink className={styles.navlink} to="/add">
          Add diary
        </NavLink>
      </nav>
      
      <Routes>
        <Route index element={<Diaries />} />
        <Route path='add' element={<AddDiary />} />
      </Routes>
      
    </>
  )
}

export default App
