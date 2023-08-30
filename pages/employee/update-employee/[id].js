import { Box, Grid, Button, Typography } from "@mui/material";
import FormEmployee from "../section/formEmployee";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from 'yup'
import { useState, useCallback, useEffect } from "react";

export default function updateEmployee(){
  const [data, setData] = useState({})
  const router = useRouter();
  const { id } = router.query;

  // const dummyEmployees =
  //   {
  //     id: id,
  //     employee_name: "John Doe",
  //     employee_age: 30,
  //     employee_salary: 50000
  //   }
  

  const getEmployee = useCallback(async () => {
    const url = `https://dummy.restapiexample.com/api/v1/employee/${id}`;
    try {
      const response = await axios.get(url);
      const responseData = response.data;
      setData(responseData.data);
      console.log(responseData.data);
    } catch (error) {
        console.error('Error:', error)
    }
  }, [id]);
  
  useEffect(() => {
    getEmployee();
  }, [getEmployee]);
  
  const updateEmployee = async (id, employeeData) => {
    const url = `https://dummy.restapiexample.com/api/v1/update/${id}`;
  
    try {
      const response = await axios.put(url, employeeData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

    const validationSchema = yup.object({
        employee_name : yup.string().required("Nama Harus Diisi"),
        employee_salary : yup.number("Isi Berupa Angka").required("Salary Harus Diisi"),
        employee_age: yup.number("Isi Berupa Angka").required("Umur Harus Diisi")

    })

    
    const formik = useFormik({
        initialValues: data,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateEmployee(id, {
              name: values.employee_name,
              salary: values.employee_salary,
              age: values.employee_age
            })
            router.push('/employee')
        }})

    return(
        <Box sx={{ borderRadius: 2, boxShadow: 1, padding: 2, marginTop: 2, backgroundColor: "#ffffff", overflowX: "auto" }}>
             <Grid container padding={4}>
            <Grid item md={9} xs={12}>
            <Typography fontSize={30} color={"black"} fontWeight={700}>Update Employee</Typography>
            </Grid>
            <Grid item md={3} xs={12} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <Button variant={"outlined"} color="primary" onClick={()=>{router.push('/employee')}} >Kembali</Button>
            </Grid>
          </Grid>
            <FormEmployee employee={formik} />
        </Box>
    )
}