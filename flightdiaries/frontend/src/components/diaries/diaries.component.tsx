import { useEffect } from "react"
import { apiService } from "../../services/axios.service"
import { useAppStore } from "../../services/app.service"
import styles from './diaries.module.css'

export const Diaries = ()=> {
  const diaries = useAppStore(x=> x.diagies)
  const setDiaries = useAppStore(x=> x.setDiaries)

  useEffect(()=> {

    apiService.getDiaries().then(diariesData => {
      setDiaries(diariesData)
    })
  }, [])

  return(<>
    {diaries&&(diaries.length>0) && <>
      {diaries.map(item=> {
        return(<>
          <div key={item.id} className={styles['diary-section']}>
            <div>{item.date} {item.weather} {item.visibility}</div>
            <div>{item.comment}</div>
          </div>
        </>)
      })}
    </>}

  </>)
}