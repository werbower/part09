import axios from "axios"
import type { DiaryData } from "./app.service"
import type { TAddDiary } from "../components/add-diary/add-diary.comptonent"

const baseURL = '/api'

export const axiosInstance = axios.create({
  baseURL
})

export const apiService = {
  getDiaries: async ()=> {
    const response = await axiosInstance.get<DiaryData[]>('/diaries')
    return response.data
  },

  addDiary: async (addDiary: TAddDiary)=> {
    const response = await axiosInstance.post('/diaries', addDiary)
    return response.data as DiaryData
  }
}