import type { CoursePart } from "../../App"

interface PartProps {part: CoursePart}
export const Part = ({part}: PartProps)=> {
    
  return(<>
    <div><b>{part.name} {part.exerciseCount}</b> {part.kind}</div>
    {part.kind === 'description' && <i>{part.description}</i>}
    {part.kind === 'basic' && <>{part.description && <i>{part.description}</i>}</>}
    {part.kind === 'group' && <>project exercises {part.groupProjectCount}</>}
    {part.kind === 'background' && <>
      {part.description && <div><i>{part.description}</i></div>} 
      submit to {part.backgroundMaterial}
    </>}
    {part.kind === 'special' && <>
      <i>{part.description}</i>
      <div>required skils: {part.requirements.join(', ')}</div>
    </>}

  </>)

}