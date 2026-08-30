import { describe, expect, it } from "vitest"
import { calculateExercises } from "./exerciseCalculator.js"

describe('method calculateExercises', async()=> {
  it ('should be correct', async()=> {
    const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2 )
    expect(result).toMatchObject({
      periodLength: 7,
      trainingDays: 5,
      success: false,
      rating: 2,
      ratingDescription: 'not too bad but could be better',
      target: 2,
      average: 1.9285714285714286
    })
  })
    
})