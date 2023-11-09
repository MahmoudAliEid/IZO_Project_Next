import React, { useEffect, useState } from 'react'
import { Chip, FormControl, Input } from '@mui/material'

export default function Warranties() {
  const [values, setValues] = useState(['test'])
  const [currValue, setCurrValue] = useState('')

  const handleKeyUp = e => {
    if (e.keyCode === 32 && currValue.trim() !== '') {
      setValues(oldState => [...oldState, currValue])
      setCurrValue('')
    }
  }

  useEffect(() => {
    console.log(values)
  }, [values])

  const handleChange = e => {
    setCurrValue(e.target.value)
  }

  const handleDelete = (item, index) => {
    let arr = [...values]
    arr.splice(index, 1)
    setValues(arr)
  }

  const handleSubmit = () => {
    console.log(values)
  }

  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <FormControl>
        <div>
          {values.map((item, index) => (
            <Chip
              sx={{ padding: '5px ', margin: '5px' }}
              size='small'
              onDelete={() => handleDelete(item, index)}
              label={item}
              key={index}
            />
          ))}
        </div>
        <Input value={currValue} onChange={handleChange} onKeyDown={handleKeyUp} />
        <button onClick={handleSubmit}>add</button>
      </FormControl>
    </div>
  )
}
