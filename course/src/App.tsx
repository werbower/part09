import { Content } from "./components/content/content.component"
import { Header } from "./components/header/header.component"
import { Total } from "./components/total/total.component"

export interface TCoursePart {name: string, exerciseCount:number}

export const App = () => {
  const courseName = "Half Stack application development"
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <div>
      <Header {...{courseName}}/>
      <Content {...{courseParts}} />
      <Total {...{totalExercises}}/>
    </div>
  )
}

