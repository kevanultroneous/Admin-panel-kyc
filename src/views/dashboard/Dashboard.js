/* eslint-disable prettier/prettier */
import { CCol, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./style.css"
const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  })

  return (
    <CRow className="mt-4">
      <CCol xl={3}>
        <div className='CardOfReview' onClick={() => navigate('/service-providers')}>
          Service Provider
        </div>
      </CCol>
      <CCol xl={3}>
        <div className='CardOfReview' onClick={() => navigate('/customers')}>
          Customers
        </div>
      </CCol>
    </CRow>
  )
}

export default Dashboard
