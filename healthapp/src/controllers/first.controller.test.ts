
import request from 'supertest'
import {  describe, expect, it, vi } from 'vitest'
import * as exerciseModule from '../exerciseCalculator.js'
import type { TExercise } from './first.controller.js'
import { app } from '../main.js'


describe('post /exercises ', async() => {
  it('should call calculateExercises', async()=> {
    const ceSpy = vi.spyOn(exerciseModule, 'calculateExercises')
      .mockReturnValue({success: true} as exerciseModule.ICalculatorResult)
    const result = await request(app).post('/exercises')
      .send({daily_exercises: [1, 2], target: 2} as TExercise)

    const resultBody = result.body as exerciseModule.ICalculatorResult

    expect(resultBody.success).toBe(true)
    expect(ceSpy).toHaveBeenCalled()
    expect(ceSpy).toHaveBeenCalledWith([1, 2], 2)

  })

  it('should calculateExercises correct', async()=> {
    const testData = {
      "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
      "target": 2.5
    } as TExercise
    
    const result = await request(app).post('/exercises').send(testData)
    const resultBody = result.body as exerciseModule.ICalculatorResult
    expect(resultBody.periodLength).toBe(7)
    expect(resultBody.trainingDays).toBe(4)
    expect(resultBody.success).toBe(false)
    expect(resultBody.rating).toBe(1)
    expect(resultBody.ratingDescription).toBe('bad')
    expect(resultBody.target).toBe(2.5)
    expect(resultBody.average).toBeCloseTo(1.214)
  })
} )