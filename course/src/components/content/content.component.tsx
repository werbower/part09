import type { TCoursePart } from "../../App"

interface ContentProps {courseParts: TCoursePart[]}

export const Content= ({courseParts}: ContentProps)=> {
  return (<>
    {courseParts.map(x=> {
      return (<p key={x.name}>{x.name} {x.exerciseCount}</p>)
    })}
  </>)
}