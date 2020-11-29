import React, { useCallback } from 'react'

import Button from '../../components/Button'

const Dashboard: React.FC = () => {
  const logout = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')
  }, [])
  return (
    <>
      <h1>Dashboard</h1>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
    </>
  )
}

export default Dashboard
