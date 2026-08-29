
type TRating = 1|2|3
const ratingDescriptions = [
  'could be better', 'not too bad', 'very well'
]
type TRatingDescription = typeof ratingDescriptions[number]

interface ICalculatorResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: TRating
  ratingDescription: TRatingDescription
  target: number
  average: number
}


export const calculateExercises = (trainingData: number[], target: number): ICalculatorResult => {

  const periodLength = trainingData.length
  const trainingDays =  trainingData.filter(x=> !!x).length
  const total = trainingData.reduce((acc, cur)=> acc+cur, 0)
  const average = total/periodLength
  const success = average >=target
  const rating = average>=target? 3: average>= target/2? 2 : 1
  const ratingDescription = ratingDescriptions[rating-1]


  return {periodLength, trainingDays, success, rating, ratingDescription, target, average}

}

if (process.argv[1]=== import.meta.filename){
  const args = process.argv.slice(2)
  const [targetStr, ...trainingDataStr] = args
  console.log(calculateExercises(trainingDataStr.map(x=> +x), +targetStr))
}
