
import React, { useEffect, useState } from "react";
import axios from "axios"
import Pagination from "./components/pagination"
import "./style.css"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead } from "@mui/material";

function App(){
    const [name, setPatientName] = useState('')
    const [age, setAge] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [patientsPerPage] = useState(5)

    const [nameList, setNameList] = useState([ ])

    useEffect(() => {
        axios.get('http://localhost:4500/api/v1/patients')
        .then(response => setNameList(response.data));         

    }, [])

    const addToList= () => {
        axios.post('http://localhost:4500/api/v1/patients', 
            {name:name, 
            age:age
        }).then(() => {
            nameList.map(() => {
                return setNameList([...setNameList, fetch({name, age})])
            })
          
        })
    
    }

    const updatePatient = (id) => {
        const newName = prompt("Enter new name: ")
        const newAge = prompt("Enter new age: ")
        axios.put(`http://localhost:4500/api/v1/patients/${id}`, {name: newName, age:newAge}
        ).then (
            () => {
                setNameList(
                    nameList.map((val) => {
                        return val._id === id ? {name: newName, age: newAge} : val
                    })
                )
            })
    }

    const deletePatient = (id) => {
        if(window.confirm("Are you sure you want to delete this patient? ")) {
            axios.delete(`http://localhost:4500/api/v1/patients/${id}`).then (
                () => {
                  setNameList(nameList.filter((val)=>{
                      return val._id !== id
                  }))  
                }
            )
        }

    }

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = nameList.slice(indexOfFirstPatient, indexOfLastPatient)

    const paginate = pageNumber => setCurrentPage(pageNumber)
    
    return(
        <div className="App">
            <br />
            <Typography component="h1" variant="h4" align="center"> Clinical Laboratory</Typography>
            <div clasName="inputs">
                <Box component="form" >
                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={(event) => {
                            setPatientName(event.target.value)}}
                    />
                    <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="age"
                            label="Age"
                            name="age"
                            autoComplete="age"
                            autoFocus
                            onChange={(event) => {
                                setAge(event.target.value)}}
                        />


                    </Box>
                <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick= {() => addToList()} >
                        Register a patient 
                </Button>
            </div>
            <div>
            <Typography component="h1"variant="h5" align="center">Patient List</Typography>
            <Paper>
                <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Name</TableCell>
                        <TableCell> Age</TableCell>
                    </TableRow>      
                </TableHead>            
            {currentPatients.map((val, key) => {
                return (
                    <div key={key}>
                        <TableBody>
                            <TableRow>
                                <TableCell>{val.name}</TableCell> 
                                <TableCell>{val.age}</TableCell>
                            </TableRow>
                        </TableBody>


                    <button onClick={() => {updatePatient(val._id);
                    }}> Update</button>
                    <button onClick={() => deletePatient(val._id)}> Delete</button>
                    </div>
                )
            })}
            <div className = "page">
                <Pagination 
                    patientsPerPage={patientsPerPage} 
                    totalPatients={nameList.length} 
                    paginate={paginate}

                            />
            </div>

            </Table>
                </TableContainer>
            </Paper>
            
             

            </div>
             <br />
        </div>
    )
}


export default App