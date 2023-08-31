
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,  Button, Grid, TextField, IconButton, TablePagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function Employee(){
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false)
  const rowsPerPage = 5;

  const router = useRouter();
  const getListEmployee = useCallback(async () => {
    const url = 'https://dummy.restapiexample.com/api/v1/employees';
    try {
      const response = await axios.get(url);
      const responseData = response.data;
      return responseData.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }, []);
  
  useEffect(() => {
    getListEmployee().then(data => {
      setData(data);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    });
  }, [getListEmployee]);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deleteEmployee = async (id) => {
    console.log(id)
    const url = `https://dummy.restapiexample.com/api/v1/delete/${id}`;
  
    try {
      const response = await axios.delete(url);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);


return(
    <div style={{minHeight: '100vh', backgroundColor:'#ffffff', display:'flex'}}>
        <main style={{
        marginLeft:10,
        marginTop: 2, 
        overflowY:"auto",
        padding: "24px", 
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        fontFamily:"Poppins"
      }}>
        <>
        <Grid container spacing={2}>
            <Grid item md={12} xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} marginBottom={5}>
                <Typography fontSize={30} color={"black"} fontWeight={800} >Manajemen Data Karyawan</Typography> 
            </Grid>
            <Grid item md={9} xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <TextField
            sx={{width:"100%"}}
            label="Pencarian"
            placeholder="Cari berdasarkan nama karyawan"
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon sx={{ fontSize: 24 }} />
                </IconButton>
              ),
            }}
          />
            </Grid>
            <Grid item md={3} xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Button variant="contained" color="primary" sx={{height:"100%", width:"100%"}} onClick={()=>{router.push('/employee/create-employee')}} > <AddIcon/>  Tambah Data Karyawan</Button>
            </Grid>
        </Grid>
        <Box sx={{ borderRadius: 2, boxShadow: 1, padding: 2, marginTop: 2, backgroundColor: "#ffffff", overflowX: "auto" }}>
      <TableContainer >
        <Table>
          <TableHead sx={{ backgroundColor: "GrayText" }}>
          <TableRow>
              <TableCell style={{ width: 60 }}>
                <Typography fontSize={15} color={"black"} fontWeight={700}>No</Typography>
              </TableCell>
              <TableCell style={{ width: 350 }}>
                <Typography fontSize={15} color={"black"} fontWeight={700}>Karyawan</Typography>
              </TableCell>
              <TableCell style={{ width: 350 }}>
                <Typography fontSize={15} color={"black"} fontWeight={700}>Salary</Typography>
              </TableCell>
              <TableCell style={{ width: 350 }}>
                <Typography fontSize={15} color={"black"} fontWeight={700}>Umur</Typography>
              </TableCell>
              <TableCell style={{ width: 350 }}>
                <Typography fontSize={15} color={"black"} fontWeight={700} textAlign={"center"}> Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ).map((item, index) => (
              <TableRow key={index}>
              <TableCell style={{ width: 60 }}>
                <Typography fontSize={15} color={"black"} fontWeight={500}>{item.id}</Typography>
              </TableCell>
              <TableCell style={{ width: 350 }}>
                <Typography fontSize={15} color={"black"} fontWeight={500}>{item.employee_name}</Typography>
              </TableCell>
              <TableCell style={{ width: 350 }}>
                <Typography fontSize={15} color={"black"} fontWeight={500}>{item.employee_salary}</Typography>
              </TableCell>
              <TableCell style={{ width: 350 }}>
                <Typography fontSize={15} color={"black"} fontWeight={500}>{item.employee_age} Tahun</Typography>
              </TableCell>
              <TableCell style={{ width: 350 }}>
              <Grid container spacing={2}>
              <Grid item md={4} xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Button variant="outlined" color="primary" sx={{textTransform:"none"}}onClick={()=>{router.push(`/employee/detail-employee/${item.id}`)}} >Detail</Button>
              </Grid>
                <Grid item md={4} xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Button variant="outlined" color="secondary" sx={{textTransform:"none"}} onClick={()=>{router.push(`/employee/update-employee/${item.id}`)}} > Edit</Button>
              </Grid>
              <Grid item md={4} xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Button variant="outlined" color="error" sx={{textTransform:"none"}} onClick={()=>{deleteEmployee(item.id)}}>  Hapus</Button>
              </Grid>
              </Grid>
            </TableCell>
            </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </Box>
        </>
        </main>
    </div>
)
}