import { Box, Grid, Typography, Button } from "@mui/material";
import FormEmployee from "../section/formEmployee";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

export default function DetailEmployee() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;
    const getEmployee = useCallback(async () => {
        const url = `https://dummy.restapiexample.com/api/v1/employee/${id}`;
        let retries = 3; // Number of retries
        while (retries > 0) {
          try {
            const response = await axios.get(url);
            const responseData = response.data;
            setData(responseData.data);
            setLoading(false);
            console.log(responseData);
            break; // Success, exit the loop
          } catch (error) {
            if (error.response && error.response.status === 429) {
              // Too Many Requests error, retry after a delay
              console.warn('Too Many Requests, retrying after delay...');
              await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
              retries--;
            } else {
              console.error('Error:', error);
              setLoading(false);
              break; // Other error, exit the loop
            }
          }
        }
      }, [id]);
    
    useEffect(() => {
      getEmployee()
    },[getEmployee]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return(
        <Box sx={{ borderRadius: 2, boxShadow: 1, padding: 2, marginTop: 2, backgroundColor: "#ffffff", overflowX: "auto" }}>
          <Grid container padding={4}>
            <Grid md={9} xs={12}>
            <Typography fontSize={30} color={"black"} fontWeight={700}>Detail Employee</Typography>
            </Grid>
            <Grid md={3} xs={12} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <Button variant={"outlined"} color="primary" onClick={()=>{router.push('/employee')}} >Kembali</Button>
            </Grid>
          </Grid>
           <FormEmployee employee={data} disabled/> 
        </Box>
    )
}