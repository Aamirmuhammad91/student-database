// StudentDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const StudentDetails = ({ students }) => {
  const { studentId } = useParams();
  const student = students.find((s) => s.id === parseInt(studentId));

  if (!student) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Student not found</Typography>
        <Button component={Link} to="/" variant="contained">
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Student Details</Typography>
      <Typography variant="body1">
        <strong>First Name:</strong> {student.firstName}
      </Typography>
      <Typography variant="body1">
        <strong>Last Name:</strong> {student.lastName}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {student.email}
      </Typography>
      <Typography variant="body1">
        <strong>Phone:</strong> {student.phone}
      </Typography>
      <Typography variant="body1">
        <strong>Class:</strong> {student.class}
      </Typography>
      <Typography variant="body1">
        <strong>Address:</strong> {student.address}
      </Typography>
      <Typography variant="body1">
        <strong>Father Name:</strong> {student.fatherName}
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Back to Home
      </Button>
    </Box>
  );
};

export default StudentDetails;
