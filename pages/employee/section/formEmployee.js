import { TextField, Box, Grid, IconButton, Typography, Button } from "@mui/material";
import { useEffect } from "react";


export default function FormEmployee({employee, disabled=false,}) {
    useEffect(() => {
        console.log(employee)
      }, []);
      
    return (
        <Box sx={{ padding: 2,  backgroundColor: "#ffffff", overflowX: "auto", height:"100vh" }}>
            <Box sx={{marginY:"40px", marginX:"20px", backgroundColor:"	#eed7a1", padding:"20px", borderRadius:"8px"}} >
        <Grid container spacing={2}>
            <Grid item md={1} xs={12} justifyContent={"flex-start"} alignItems={"center"} display={"flex"}>
                <Typography sx={{color: "#000"}} fontSize={20}>Nama :</Typography>
                </Grid>
                <Grid item md={11} xs={12}>
                <TextField
                name="employee_name"
                sx={{ width: "100%" }}
                placeholder={"Tuliskan Nama"}
                value={employee?.values?.employee_name !== "" ? employee?.values?.employee_name : employee?.employee_name}
                onChange={employee?.handleChange}
                helperText={
                    employee?.touched?.employee_name &&
                    employee?.errors?.employee_name
                    }
                    error={Boolean(
                      employee?.touched?.employee_name &&
                      employee?.errors?.employee_name
                    )
                    }
                    onBlur={employee?.handleBlur}
                disabled={disabled}
                />
            </Grid>
        <Grid item md={1} xs={12} justifyContent={"flex-start"} alignItems={"center"} display={"flex"}>
                <Typography sx={{color: "#000"}} fontSize={20}>Salary :</Typography>
                </Grid>
                <Grid item md={11} xs={12}>
                <TextField 
                name="employee_salary"
                sx={{ width: "100%" }}
                placeholder={"Tuliskan Salary"}
                value={employee?.values?.employee_salary !== "" ? employee?.values?.employee_salary : employee?.employee_salary}
                onChange={employee?.handleChange}
                helperText={
                    employee?.touched?.employee_salary &&
                    employee?.errors?.employee_salary
                    }
                    error={Boolean(
                      employee?.touched?.employee_salary &&
                      employee?.errors?.employee_salary
                    )
                    }
                    onBlur={employee?.handleBlur}
                disabled={disabled}
                />
            </Grid>
            <Grid item md={1} xs={12} justifyContent={"flex-start"} alignItems={"center"} display={"flex"}>
                <Typography sx={{color: "#000"}} fontSize={20}>Umur :</Typography>
                </Grid>
                <Grid item md={11} xs={12}>
                <TextField
                name="employee_age"
                sx={{ width: "100%" }}
                placeholder={"Tuliskan Umur"}
                value={employee?.values?.employee_age !== ""? employee?.values?.employee_age : employee?.employee_age}
                onChange={employee?.handleChange}
                helperText={
                    employee?.touched?.employee_age &&
                    employee?.errors?.employee_age
                    }
                    error={Boolean(
                      employee?.touched?.employee_age &&
                      employee?.errors?.employee_age
                    )
                    }
                    onBlur={employee?.handleBlur}
                disabled={disabled}
                />
            </Grid>
            { !disabled && (
            <Grid item md={12} xs={12} justifyContent={"flex-end"} alignItems={"flex-end"} display={"flex"}>
                <Button variant={"contained"} color={"primary"} onClick={employee?.handleSubmit}>Submit</Button>
            </Grid>
            )
}
        </Grid>
        </Box>
        </Box>
    )
}