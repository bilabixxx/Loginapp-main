import React from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonEdit = () => {
  const navigate = useNavigate();
  const edit = () => {
    navigate('/edit')
  }

  return (
    <form className="form-inline my-2 mx-2">
      <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={edit}>Edit</button>
    </form>
  )
}

export default ButtonEdit