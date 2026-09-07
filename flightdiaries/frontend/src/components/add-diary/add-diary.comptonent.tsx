import type { SubmitEvent } from "react"
import { apiService } from "../../services/axios.service"
import { useNavigate } from "react-router"
import styles from './add-diary.module.css'
import axios, { AxiosError } from "axios"
import { showNoti } from "../../services/app.service"

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
    
    try {
      await apiService.addDiary({date, weather, visibility, comment})
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
        <input type="text" id="ad_date" name="date" />
      </div>
      <div className={styles.row}>
        <label htmlFor="ad_weather">weather</label>
        <select id="ad_weather" name="weather">
          <option key={undefined} value='' disabled selected hidden >Select</option>
          {weatherVals.map(item=> {
            return (<option key={item} value={item}>{item}</option>)
          })}
        </select>
      </div>
      <div className={styles.row}>
        <label htmlFor="ad_visibility">visibility</label>
        <select id="ad_visibility" name="visibility">
          {visibilityVals.map(item=> {
            return (<option key={item} value={item}>{item}</option>)
          })}
        </select>
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