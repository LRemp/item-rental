import React from 'react';
import { Input } from '@mantine/core';
import InputMask from 'react-input-mask';

const PhoneNumberInput = ({ value, onChange, ...props }) => {
  return (
    <Input
      component={InputMask}
      mask="+1 (999) 999-9999"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default PhoneNumberInput;
