import React from 'react'

// default name is obliterumYield
// just used for an input in case the obliterum yield ever changes.
// Which it most likely won't, so we can probably disable this.
export const ObliterumYield = ({ value, handleChange }) => (
  <input name="obliterumYield" value={value} onChange={(e) => handleChange(e)}/>
)