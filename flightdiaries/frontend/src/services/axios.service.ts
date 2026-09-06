import axios from "axios"
import type { DiaryData } from "./app.service"

const baseURL = '/api'

export const axiosInstance = axios.create({
  baseURL
})

export const apiService = {
  getDiaries: async ()=> {
    const response = await axiosInstance.get<DiaryData[]>('/diaries')
    return response.data
  }
}