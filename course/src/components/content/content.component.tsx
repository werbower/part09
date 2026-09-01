import type { CoursePart } from "../../App"
import { Part } from "../part/part.component"

interface ContentProps {courseParts: CoursePart[]}

export const Content= ({courseParts}: ContentProps)=> {
  return (<>
    {courseParts.map(part=> {
      return (<p key={part.name}><Part {...{part}}/></p>)
    })}
  </>)
}