import { List, ListItem, Typography } from "@mui/material"
import { Diagnose, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../services/patients.models"
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import FavoriteIcon from '@mui/icons-material/Favorite'

type PatientEntryProps = {entry: Entry}
const checkIconColors = ['green', 'yellow', 'red']

export const PatientEntry = ({entry}: PatientEntryProps)=> {

    const entryVal = entry.type === "HealthCheck"? (entry as HealthCheckEntry):
    entry.type === 'Hospital'? (entry as HospitalEntry):
    entry.type === 'OccupationalHealthcare'? (entry as OccupationalHealthcareEntry): null as never

    if (!entry) return(<></>)
        
    const typeIcon = entryVal.type === 'HealthCheck'? <MedicalInformationIcon />:
    entryVal.type === 'Hospital'? <LocalHospitalIcon/>: <MedicalServicesIcon />

    const diagnoses = (!!entryVal.diagnosisCodes?.length && <List sx={{listStyleType: 'disc', listStylePosition: 'inside',
            '& .MuiListItem-root': {display: 'list-item'}}}>
                {(entryVal.diagnosisCodes as Diagnose[]).map(d=> (<ListItem key={d.code} sx={{padding: 0}}>
                    <Typography variant="body1" sx={{display: 'inline'}}>{d.code} {d.name}</Typography></ListItem>))}
            </List>)
    
    switch(entry.type) {
        case 'HealthCheck': {
            const checkIconColor = checkIconColors[entry.healthCheckRating] || 'black'
            
            return(<>
            <Typography  variant="body1" sx={{display: 'flex', columnGap: '.3em', alignItems: 'center'}}
                >{entryVal.date} {typeIcon}</Typography>
            <Typography  sx={{ fontStyle: 'italic'}}>{entryVal.description}</Typography>
            <FavoriteIcon sx={{color: checkIconColor}}/>
            <Typography >diagnose by {entry.specialist}</Typography>
            {diagnoses}
            </>)
            break
        }
        case 'OccupationalHealthcare': {
            return(<>
            <Typography  variant="body1" sx={{display: 'flex', columnGap: '.3em', alignItems: 'center'}}
                >{entryVal.date} {typeIcon} {entry.employerName}</Typography>
            <Typography  sx={{ fontStyle: 'italic'}}>{entryVal.description}</Typography>
            <Typography >diagnose by {entry.specialist}</Typography>
            {!!entry.sickLeave?.startDate && <>
            <Typography >sick live </Typography>
            <Typography >stard date {entry.sickLeave.startDate} - end date {entry.sickLeave.endDate} </Typography>
            </>}
            {diagnoses}
            </>)
            break
        }
        case 'Hospital': {
            return(<>
            <Typography  variant="body1" sx={{display: 'flex', columnGap: '.3em', alignItems: 'center'}}
                >{entryVal.date} {typeIcon}</Typography>
            <Typography  sx={{ fontStyle: 'italic'}}>{entry.description}</Typography>
            <Typography >diagnose by {entry.specialist}</Typography>
            {!!entry.discharge && <>
            <Typography >discharge </Typography>
            <Typography >date: {entry.discharge.date}; criteria: {entry.discharge.criteria} </Typography>
            </>}
            {diagnoses}
            </>)
            break
        }
    }


    return(<></>)
}