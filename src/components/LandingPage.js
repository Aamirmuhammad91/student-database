// LandingPage.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { Link } from 'react-router-dom';

const LandingPage = ({ students, addStudent, updateStudent, deleteStudent }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleOpenModal = (student = null) => {
    setCurrentStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentStudent(null);
    setModalOpen(false);
  };

  const handleSaveStudent = (student) => {
    if (currentStudent) {
      updateStudent(student);
    } else {
      student.id = students.length ? students[students.length - 1].id + 1 : 1;
      addStudent(student);
    }
    handleCloseModal();
  };

  const columns = [
    { header: 'First Name', accessorKey: 'firstName' },
    { header: 'Last Name', accessorKey: 'lastName' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Phone No', accessorKey: 'phone' },
    { header: 'Class', accessorKey: 'class' },
    {
      header: 'Actions',
      accessorKey: 'actions',
      Cell: ({ row }) => (
        <>
          <Button variant="outlined" onClick={() => handleOpenModal(row.original)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => deleteStudent(row.original.id)}>
            Delete
          </Button>
          <Button component={Link} to={`/student/${row.original.id}`} variant="contained">
            View
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Student Management System</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add Student
      </Button>
      <MaterialReactTable columns={columns} data={students} getRowId={(row) => row.id} />
      <StudentModal open={modalOpen} handleClose={handleCloseModal} handleSave={handleSaveStudent} student={currentStudent} />
    </Box>
  );
};

const StudentModal = ({ open, handleClose, handleSave, student }) => {
  const [firstName, setFirstName] = useState(student?.firstName || '');
  const [lastName, setLastName] = useState(student?.lastName || '');
  const [email, setEmail] = useState(student?.email || '');
  const [phone, setPhone] = useState(student?.phone || '');
  const [classField, setClassField] = useState(student?.class || '');
  const [address, setAddress] = useState(student?.address || '');
  const [fatherName, setFatherName] = useState(student?.fatherName || '');

  useEffect(() => {
    if (student) {
      setFirstName(student.firstName);
      setLastName(student.lastName);
      setEmail(student.email);
      setPhone(student.phone);
      setClassField(student.class);
      setAddress(student.address);
      setFatherName(student.fatherName);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setClassField('');
      setAddress('');
      setFatherName('');
    }
  }, [student]);

  const handleSubmit = () => {
    handleSave({ id: student?.id, firstName, lastName, email, phone, class: classField, address, fatherName });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          margin: 'auto',
          maxWidth: 600,
          width: '90%',
          mt: 10,
          borderRadius: 1,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2">
          Student Information
        </Typography>
        <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth margin="normal" />
        <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth margin="normal" />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
        <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth margin="normal" />
        <TextField label="Class" value={classField} onChange={(e) => setClassField(e.target.value)} fullWidth margin="normal" />
        <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth margin="normal" />
        <TextField label="Father Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} fullWidth margin="normal" />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', bottom: 0, bgcolor: 'background.paper', pb: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LandingPage;
