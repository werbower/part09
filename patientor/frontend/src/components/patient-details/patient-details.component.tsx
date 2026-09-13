import { Box, Button, List, ListItem, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"

import patientService from "../../services/patients"
import { Gender, Patient } from "../../types"
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import { PatientEntry } from "../patient-entry/patient-entry.component"
import { useAppStore } from "../../services/app.service"
import { Diagnose } from "../../services/patients.models"
import { PatienEntryAdd } from "../patient-entry-add/patient-entry-add.component"
import { DetailsContext } from "./details-context"




export const PatientDetails = ()=> {
  const navigate = useNavigate()
  const [patient, setPatient] = useState<Patient|null>(null)
  const diagnoses = useAppStore(x=> x.diagnoses)

  const entries = patient?.entries
  
  if (entries?.length && diagnoses?.length) {
    entries.forEach(entry => {
      if (entry.diagnosisCodes?.length) {
        entry.diagnosisCodes = ((entry.diagnosisCodes as string[]).map(code=> {
          return ((typeof code === 'string') && diagnoses.find(d=> d.code === code)) || code
        }) as Diagnose[])
      }
    })
  }
    

  const {patientId} = useParams()
  const fetchPatient = async () => {
    const patientValue = await patientService.getPatient(patientId as string)
    setPatient(patientValue)
  }

  useEffect(()=> {
    (()=> fetchPatient())()
  }, [])

  

  const getGS =  patient?.gender === Gender.Male? <MaleIcon/>:
    patient?.gender===Gender.Female? <FemaleIcon/>: <TransgenderIcon/>

  const handleAdd = ()=> {
    navigate('add-new')
  }
        
  return (<Box>
    {!!patient && <>
      <Typography variant="h5" sx={{
        fontWeight: 'bold',
        display: "flex", alignItems: 'center', columnGap: '.3em', mb: '1em'}}
      >{patient.name} {getGS}</Typography>

      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <Typography variant="body1">date of birth: {patient.dateOfBirth}</Typography>

      <DetailsContext value={{fetchPatient}}>
        <Routes>
          <Route index element={<>
            {!!entries?.length && <>
              <Typography variant="h6" sx={{fontWeight: 'bold', margin: '1em 0'}}>entries</Typography>

              <List sx={{padding: 0}}>
                {entries.map(x=> {
                  return(<ListItem key={x.id} sx={{padding: '.2em', display: 'block', border: '1px solid grey', borderRadius: '.2em',
                    '&+li.MuiListItem-root': {mt: '1em'}}}>
                    <PatientEntry entry={x}/>
                  </ListItem>)
                })}
              </List>
            </>}

            <Box sx={{mt: '1em'}}>
              <Button variant="contained" onClick={handleAdd}>ADD NEW ENTRY</Button>
            </Box>
          </>}/>

          <Route path="add-new" element={<PatienEntryAdd />}/>

        </Routes>
      </DetailsContext>
    </>}
  </Box>)
}