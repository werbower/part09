
import { NavLink, Route, Routes } from 'react-router'
import styles from './App.module.css'
import { Diaries } from './components/diaries/diaries.component'
import { AddDiary } from './components/add-diary/add-diary.comptonent'
import { useAppStore } from './services/app.service'
import { Noti } from './components/noti/noti.component'

function App() {
  const message = useAppStore(x=> x.notiMessage)
  

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
      
      {!!message && <Noti {...{message }}/>}
      
      <Routes>
        <Route index element={<Diaries />} />
        <Route path='add' element={<AddDiary />} />
      </Routes>
      
    </>
  )
}

export default App
