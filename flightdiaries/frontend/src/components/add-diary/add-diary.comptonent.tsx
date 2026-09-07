import type { SubmitEvent } from "react"
import { apiService } from "../../services/axios.service"
import { useNavigate } from "react-router"
import styles from './add-diary.module.css'
import { showNoti } from "../../services/app.service"
import { AxiosError } from "axios"

const weatherVals = ['sunny','rainy','cloudy','stormy','windy']
const visibilityVals = ['great','good','ok','poor']


type Weather = (typeof weatherVals)[number]
type Visibility = (typeof visibilityVals)[number]

export type TAddDiary = {
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

interface FormItems {
  date: HTMLInputElement
  weather: HTMLSelectElement
  visibility: HTMLSelectElement
  comment: HTMLInputElement
}
type Target = SubmitEvent<HTMLFormElement>['target']&FormItems

export const AddDiary = ()=> {
  const navigate = useNavigate()


  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>)=> {
    e.preventDefault()
    const form = e.currentTarget as Target

    const date = form.date.value
    const weather = form.weather.value as Weather
    const visibility = form.visibility.value as Visibility
    const comment = form.comment.value

    const newDiary = {date, weather, visibility, comment}
    console.log('date value', newDiary)
    
    
    try {
      await apiService.addDiary(newDiary)
      navigate('/')

    } catch (err) {
      
      if (!!err && err instanceof AxiosError) {
        const errorMessages: string[] = []
        const errArray = err.response?.data?.error
        if (Array.isArray(errArray)){
          errArray.forEach((item: {code: string, path?: string[], message?: string})=> {
            errorMessages.push( `${item.path?.[0]} ${item.code} ${item.message}`)
          })
        }
        showNoti(errorMessages)
      }
    }
    

  }

  return(<>
    <form onSubmit={(e)=> handleSubmit(e)} className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="ad_date">date</label>
        <input type="date" id="ad_date" name="date" />
      </div>
      <div className={styles.row}>
        <span >weather: </span>
        {weatherVals.map(item => {
          return (<span key={item} >
            <label htmlFor={`ad-weather-${item}`}>{item}</label>
            <input type="radio" id={`ad-weather-${item}`} name="weather" value={item}/>
          </span>)
        })}        
      </div>
      <div className={styles.row}>
        <span >visibility:</span>
        {visibilityVals.map(item => {
          return (<span key={item}>
            <label htmlFor={`ad_visibility-${item}`}>{item}</label>
            <input type="radio" id={`ad_visibility-${item}`} name="visibility" value={item}/>
          </span>)
        })}
      </div>
      <div className={styles.row}>
        <label htmlFor="ad_comment">comment</label>
        <input type="text" id="ad_comment" name="comment"/>
      </div>
      <div className={styles.row}>
        <button type="submit">Add</button>
      </div>
      
    </form>
  </>)
}