import React, { useEffect, useState } from "react";
import { Container, Typography, Box, TextField, IconButton, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllUser();
  }, [searchQuery]);

  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const logOut = () => {
    window.localStorage.clear();
    navigate('/sign-in');
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Welcome Admin
        </Typography>
        <Box sx={{ mt: 2, width: '100%', position: 'relative', mb: 2 }}>
          <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: 10, top: 13, color: 'black' }} />
          <TextField
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
            sx={{ pl: 4 }}
          />
          <Typography variant="body2" sx={{ position: 'absolute', right: 10, top: 13, color: '#aaa' }}>
            {searchQuery.length > 0 ? `${data.length} Records Found` : `Total Records ${data.length}`}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.fname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userType}</TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteUser(user._id, user.fname)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={logOut}>
          Log Out
        </Button>
      </Box>
    </Container>
  );
};

export default AdminHome;
