import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/form.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('normalUser');
  const [userData, setUserData] = useState({
    name: userType === 'normalUser' ? 'John Doe' : 'Game Dev',
    email: '',
    phoneno: '',
    address: '',
    dob: userType === 'normalUser' ? '2000-01-01' : '1990-01-01',
    location: 'Unknown',
    employee_id: '',
    company_name: userType === 'gameDeveloper' ? 'Company Name' : '',
    company_url: userType === 'gameDeveloper' ? 'http://example.com' : '',
    password: 'default_password'
  });
  const [formErrors, setFormErrors] = useState({});

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setUserData({
      name: type === 'normalUser' ? 'John Doe' : 'Game Dev',
      email: '',
      phoneno: '',
      address: '',
      dob: type === 'normalUser' ? '2000-01-01' : '1990-01-01',
      location: 'Unknown',
      employee_id: type === 'gameDeveloper' ? '' : '',
      company_name: type === 'gameDeveloper' ? 'Company Name' : '',
      company_url: type === 'gameDeveloper' ? 'http://example.com' : '',
      password: 'default_password'
    });
    setFormErrors({});
  };

  const handleFieldChange = (fieldName, value) => {
    setUserData({ ...userData, [fieldName]: value });
    setFormErrors({ ...formErrors, [fieldName]: '' }); // Clear error for this field
  };

  const validateForm = () => {
    const errors = {};

    if (!userData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!userData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(userData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!userData.phoneno.trim()) {
      errors.phoneno = 'Phone number is required';
    } else if (!isValidPhone(userData.phoneno)) {
      errors.phoneno = 'Invalid phone number format';
    }

    if (!userData.address.trim()) {
      errors.address = 'Address is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const isValidEmail = (email) => {
    // Basic email validation using regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    // Basic phone number validation (10 digits)
    return /^\d{10}$/.test(phone);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const endpoint = userType === 'normalUser' ? '/api/users/normal-user/create/' : '/api/users/game-developer/create/';
        
        const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, userData);
        console.log(response.data); // Log the response data
  
        // Show alert with signup success message and display email and password
        alert(`Signup successful!\n\nEmail: ${userData.email}\nPassword: ${userData.password}`);
  
        // Redirect to login page after successful signup
        navigate('/login');
      } catch (error) {
        console.error('Error creating user:', error);
        // Handle error (e.g., display error message to user)
      }
    } else {
      console.log('Form validation failed. Please check your inputs.');
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phoneno', label: 'Phone Number', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'location', label: 'Location', type: 'text' },
    ...(userType === 'gameDeveloper'
      ? [
          { name: 'employee_id', label: 'Employee ID', type: 'text' },
          { name: 'company_name', label: 'Company Name', type: 'text' },
          { name: 'company_url', label: 'Company URL', type: 'url' }
        ]
      : []),
    { name: 'password', label: 'Password', type: 'password' }
  ];

  return (
    <div className="auth-container">
      <h2 className="auth-title">Signup</h2>
      <div>
        <button className="switch-btn" onClick={() => handleUserTypeChange('normalUser')}>
          Normal User
        </button>
        <button className="switch-btn" onClick={() => handleUserTypeChange('gameDeveloper')}>
          Game Developer
        </button>
      </div>
      <AuthForm
        userType={userData}
        fields={fields}
        onChange={handleFieldChange}
        onSubmit={handleSignupSubmit}
        formErrors={formErrors} // Pass formErrors to display validation errors
      />
      <p className="switch-page-text">
        Already have an account? <Link to="/login" className="switch-page-link">Login here</Link>
      </p>
    </div>
  );
};

export default SignupPage;
