import React from 'react'
import TableUser from './Component/TableUser'
import NavAdmin from './NavAdmin'

const Users = () => {
  return (
    <div className="w-full">
      <NavAdmin />
      <div className="m-5">
        <TableUser />
      </div>
    </div>
  )
}

export default Users
