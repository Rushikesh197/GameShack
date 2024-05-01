import React from 'react';
import FieldInput from './FieldInput';

const AuthForm = ({ userType, fields, onChange, onSubmit }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {fields.map((field) => (
        <FieldInput
          key={field.name}
          label={field.label}
          type={field.type}
          value={userType[field.name]}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthForm;
