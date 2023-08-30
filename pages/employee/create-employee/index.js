import { Box, Grid, Button, Typography } from "@mui/material";
import FormEmployee from "../section/formEmployee";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from 'yup'

export default function createEmployee(){
    const router = useRouter()

    const initialValues = {
        employee_name:"",
        employee_age:"",
        employee_salary:""
    }

    const validationSchema = yup.object({
        employee_name : yup.string().required("Nama Harus Diisi"),
        employee_salary : yup.number("Isi Berupa Angka").required("Salary Harus Diisi"),
        employee_age: yup.number("Isi Berupa Angka").required("Umur Harus Diisi")

    })

    const postData = async (values) => {
        const url = 'https://dummy.restapiexample.com/api/v1/create';
      
        const employeeData = {
          name: values.employee_name,
          age: values.employee_age,
          salary: values.employee_salary
        };
      
        try {
          const response = await axios.post(url, employeeData);
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            postData(values)
            router.push('/employee')
        }})

    return(
        <Box sx={{ borderRadius: 2, boxShadow: 1, padding: 2, marginTop: 2, backgroundColor: "#ffffff", overflowX: "auto" }}>
             <Grid container padding={4}>
            <Grid md={9} xs={12}>
            <Typography fontSize={30} color={"black"} fontWeight={700}>Create Employee</Typography>
            </Grid>
            <Grid md={3} xs={12} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <Button variant={"outlined"} color="primary" onClick={()=>{router.push('/employee')}} >Kembali</Button>
            </Grid>
          </Grid>
            <FormEmployee employee={formik} />
        </Box>
    )
}