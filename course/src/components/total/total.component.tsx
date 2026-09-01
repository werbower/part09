interface TotalProps {totalExercises: number}
export const Total = ({totalExercises}: TotalProps)=> {

  return (<>
    <p>
      Number of exercises {totalExercises}
    </p>
  </>)
}