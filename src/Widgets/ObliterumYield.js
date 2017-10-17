import React from 'react'

export const ObliterumYield = ({ value, handleChange }) => (
  console.log(value),
  <input value={value} onChange={(e) => handleChange(e)}/>
)