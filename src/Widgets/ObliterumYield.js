import React from 'react'

// default name is obliterumYield
export const ObliterumYield = ({ value, handleChange }) => (
  <input name="obliterumYield" value={value} onChange={(e) => handleChange(e)}/>
)