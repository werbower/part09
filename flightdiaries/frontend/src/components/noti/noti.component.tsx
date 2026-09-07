

import styles from './noti.module.css'

type NotiProps = {message: string[]}

export const Noti = ({message}: NotiProps)=> {
    
  return (<>
    {Array.isArray(message) && 
    <div className={styles['noti-section']}>
      {message.map(x=> (<div key={x}>{x}</div>))}
    </div>}

  </>)
}