import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { Diagnose, EntryCreate, EntryType, entryTypes, HealthCheckRating } from "../../services/patients.models"
import {  SubmitEvent, useContext, useState } from "react"
import { useAppStore } from "../../services/app.service"
import patientService from "../../services/patients"
import { DetailsContext } from "../patient-details/patient-details.component"


type TargetEvent = {target: {value: unknown}}

export const PatienEntryAdd = ()=> {
  const {fetchPatient} = useContext(DetailsContext)
  const navigate = useNavigate()
  const [selectedEntryType, setSelectedEntryType] = useState<EntryType>()
  const diagnoses = useAppStore(x=> x.diagnoses)
  const [selDiagnoses, setSelDiagnoses] = useState<string[]>([])

  const {patientId}= useParams()

  const handleEntryTypeChange = (e: TargetEvent)=> {
    const selected = e.target.value as EntryType
    if (selectedEntryType === selected) return
    setSelectedEntryType(selected)
  }

  const formHeader = `New ${selectedEntryType||''} Entry`
  

  const handleSelDiagnoses = (e: TargetEvent)=> {
    const val = e.target.value as string|string[]
    const result: string[] = typeof val === 'string'? val.split(','): val
    setSelDiagnoses(result)
  }
  const renderSelDiagnoses = (selected: string[])=> {
    return selected.join(', ')
  }
  
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>)=> {
    e.preventDefault()
    const fData = new FormData(e.target)
    const entryData = Object.fromEntries(fData.entries()) as any as EntryCreate

    await patientService.createEntry(patientId as string, entryData)
    await fetchPatient()
    navigate(`/patients/${patientId}`)
  }

  const handleCancel = ()=> {
    navigate(-1)
  }

  const renderHealthRating = (val: number)=> {
    const found = Object.entries(HealthCheckRating).find(([_k, v])=> v === val)
    return found && `${found[1]}-${found[0]}`

  }


  return(
    <Box component={'form'} onSubmit={(e)=>handleSubmit(e)}
      sx={{border: '1px dotted grey', borderRadius: '.3em', p: '.5em', mt: '1em'}}>
      <Typography variant="h6" sx={{mb: '1em'}}>{formHeader}</Typography>
      <Box 
        sx={{'.MuiFormControl-root+.MuiFormControl-root': {mt: '.5em'}}}>
        <FormControl fullWidth variant="outlined" >
          <InputLabel id="entryType-label">Entry type</InputLabel>
          <Select
            labelId="entryType-label"
            id="entryType-select"
            label='Entry type'
            onChange={(e)=> handleEntryTypeChange(e)}
            name="type"
          >
            <MenuItem value={undefined} disabled hidden />
            {entryTypes.map(x=> {
              return (<MenuItem
                sx={{'&.Mui-selected': {backgroundColor: 'lightblue', border: '1px solid lightblue'}}}
                value={x.type}>{x.descr}</MenuItem>)
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth >
          
          <TextField
            type="date"
            slotProps={{inputLabel: {shrink: true}}}
            id="date-input"
            label='Date *'
            
            name="date"
          />
        </FormControl>

        <FormControl fullWidth >
          <TextField
            id="description-input"
            label='Description *'
            name="description"
          />
        </FormControl>

        <FormControl fullWidth >
          <TextField
            id="specialist-input"
            label='Specialist *'
            name="specialist"
          />
        </FormControl>

        {selectedEntryType==='HealthCheck' &&<>
          <FormControl fullWidth variant="outlined" >
            <InputLabel id="healthCheckRating-label">Health Check Rating *</InputLabel>
            <Select
              labelId="healthCheckRating-label"
              id="healthCheckRating-select"
              label='Health Check Rating'
              
              name="healthCheckRating"
              renderValue={renderHealthRating}
              
            >
              <MenuItem value={undefined} disabled hidden />
              {(Object.entries(HealthCheckRating)).map(([k, val])=> {
                return (<MenuItem value={val}>{k}</MenuItem>)
              })}
            </Select>
          </FormControl>
        </>}

        {selectedEntryType==='Hospital' && <Box sx={{border: '1px dotted grey', 
          borderRadius: '.3em', m: '.5em .1em', p: '.5em'}}>
          <Typography sx={{mb: '1em'}}>Discharge *</Typography>
          <FormControl fullWidth  >
            <TextField
              type="date"
              slotProps={{inputLabel: {shrink: true}}}
              id="dischargeDate-input"
              label='Date *'
              name="dischargeDate"
            />
          </FormControl>
          <FormControl fullWidth >
            <TextField
              id="dischargeCriteria-input"
              label='Criteria *'
              name="dischargeCriteria"
            />
          </FormControl>

        </Box>}

        {selectedEntryType==='OccupationalHealthcare' && <>
          <FormControl fullWidth variant="outlined" >
            <TextField
              id="employerName-input"
              label='Employer Name *'
              name="employerName"
            />
          </FormControl>
        
        
          <Box sx={{border: '1px dotted grey', 
            borderRadius: '.3em', m: '.5em .1em', p: '.5em'}}>
            <Typography sx={{mb: '1em'}}>Sick Leave</Typography>
            <FormControl fullWidth  >
              <TextField
                type="date"
                slotProps={{inputLabel: {shrink: true}}}
                id="sickLeaveStartDate-input"
                label='Start Date'
                name="sickLeaveStartDate"
              />
            </FormControl>
            <FormControl fullWidth >
              <TextField
                type="date"
                slotProps={{inputLabel: {shrink: true}}}
                id="sickLeaveEndDate-input"
                label='End Date'
                name="sickLeaveEndDate"
              />
            </FormControl>

          </Box>
        </>}
        
        <FormControl fullWidth variant="outlined" >
          <InputLabel id="diagnosisCodes-label">Diagnosis Codes (comma separated)</InputLabel>
          <Select
            
            labelId="diagnosisCodes-label"
            id="diagnosisCodes-select"
            label='Diagnosis Codes (comma separated)'
            name="diagnosisCodes"
            value={selDiagnoses}
            onChange={handleSelDiagnoses}
            multiple
            renderValue={renderSelDiagnoses} 
          >
            {!!diagnoses && diagnoses.map((x: Diagnose)=> {
              return (<MenuItem 
                sx={{'&.Mui-selected': {backgroundColor: 'lightblue', border: '1px solid lightblue'}}}
                value={x.code}>{x.code} {x.name}</MenuItem>)
            })}
          </Select>
        </FormControl>

      </Box>
      <Box sx={{mt: '1em', display: 'flex', columnGap: '1em'}}>
        <Button variant="contained" type="submit" >Ok</Button>
        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
      </Box>
    </Box>)
}