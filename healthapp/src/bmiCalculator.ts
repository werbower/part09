
export type BmiCategory =
  | 'Underweight'
  | 'Normal range'
  | 'Overweight'
  | 'Obsese'

export const bmiLimits: {[key in BmiCategory]: {min: number; max: number}} =
  {
    Underweight: {min: 0, max: 18.5},
    'Normal range': {min: 18.5, max: 25},
    Overweight: {min: 25, max: 30},
    Obsese: {min: 30, max: Number.POSITIVE_INFINITY},
  }

export const calculateBmi = (height: number, mass: number): BmiCategory|undefined => {

  if (height < 0 || height === 0) return 
  const hVal = height / 100
  const bmi = mass / (hVal * hVal)


  const result = Object.entries(bmiLimits).find(([_k, limits]) => bmi >= limits.min && bmi < limits.max)
  return (result ? result[0] : undefined) as BmiCategory
}

if (process.argv[1]=== import.meta.filename){
  const args = process.argv.slice(2)
  const [heightStr, massStr] = args
  console.log(calculateBmi(+heightStr, +massStr))
}


