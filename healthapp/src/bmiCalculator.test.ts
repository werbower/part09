import {describe, expect, it } from 'vitest'
import { calculateBmi } from './bmiCalculator.js'

describe('method calculateBmi', async()=> {
  it('normal range', async ()=> {
    const result = calculateBmi(180, 74)
    expect(result).toBe('Normal range')
    
  })

})