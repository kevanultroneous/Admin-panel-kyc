/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CRow,
} from '@coreui/react'
import './login.css'

const ChangePassword = () => {
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [passwordCopy, setPasswordCopy] = useState('')

    const saveAction = () => {
        navigate('/login')
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={5}>
                        <CCardGroup>
                            <CCard className="p-4 cardstyle">
                                <CCardBody>
                                    <CForm>
                                        <h2>Change Password</h2>
                                        <CInputGroup className="mb-4 mt-4">
                                            <CFormInput
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                placeholder="Enter old password"
                                                className='inputborder'
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CFormInput
                                                value={passwordNew}
                                                onChange={(e) => setPasswordNew(e.target.value)}
                                                type="password"
                                                placeholder="Enter new password"
                                                className='inputborder'
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CFormInput
                                                value={passwordCopy}
                                                onChange={(e) => setPasswordCopy(e.target.value)}
                                                type="password"
                                                placeholder="Enter confirm password"
                                                className='inputborder'
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4 loginbtn" onClick={saveAction}>
                                                    Save
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default ChangePassword
