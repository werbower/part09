import { Box, List, ListItem, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import patientService from "../../services/patients"
import { Gender, Patient } from "../../types"
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import { PatientEntry } from "../patient-entry/patient-entry.component"



export const PatientDetails = ()=> {
    const [patient, setPatient] = useState<Patient|null>(null)
    

    const {id} = useParams()
    useEffect(()=> {
        
    const fetchPatient = async () => {
      const patientValue = await patientService.getPatient(id as string)
      setPatient(patientValue)


    }
    fetchPatient()
    }, [])

    const getGS =  patient?.gender === Gender.Male? <MaleIcon/>:
        patient?.gender===Gender.Female? <FemaleIcon/>: <TransgenderIcon/>
        
    return (<Box>
        {!!patient && <>
        <Typography variant="h5" sx={{
            fontWeight: 'bold',
            display: "flex", alignItems: 'center', columnGap: '.3em', mb: '1em'}}
            >{patient.name} {getGS}</Typography>

        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">occupation: {patient.occupation}</Typography>
        <Typography variant="body1">date of birth: {patient.dateOfBirth}</Typography>

            {!!patient.entries?.length && <>
            <Typography variant="h6" sx={{fontWeight: 'bold', margin: '1em 0'}}>entries</Typography>

            <List sx={{padding: 0}}>
            {patient.entries.map(x=> {
                return(<ListItem key={x.id} sx={{padding: '.2em', display: 'block', border: '1px solid grey', borderRadius: '.2em',
                '&+li.MuiListItem-root': {mt: '1em'}}}>
                    <PatientEntry entry={x}/>
                </ListItem>)
            })}
            </List>
            </>}


        </>}
        </Box>)
}