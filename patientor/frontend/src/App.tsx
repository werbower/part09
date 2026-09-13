import { useState, useEffect } from "react"
import axios from "axios"
import { Route, Link, Routes } from "react-router-dom"
import { Button, Divider, Container, Typography } from '@mui/material'

import { apiBaseUrl } from "./constants"
import { Patient } from "./types"

import patientService from "./services/patients"
import PatientListPage from "./components/PatientListPage"
import { PatientDetails } from "./components/patient-details/patient-details.component"
import { useAppStore } from "./services/app.service"

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchData = async () => {
      const patients = await patientService.getAll()
      setPatients(patients)

      const diagnoses = await patientService.getDiagnoses()
      useAppStore.getState().setDiagnoses(diagnoses)
    }
    fetchData()
    
  }, [])
  
  return (
    <div className="App">
      <Container>
        <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider sx={{ marginY: 2 }} />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path='/patients/:patientId/*' element={<PatientDetails />}/>
        </Routes>
      </Container>
      
    </div>
  )
}

export default App
