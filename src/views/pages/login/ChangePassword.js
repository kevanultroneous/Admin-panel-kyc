/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
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
import { ChangePasswordApi } from 'src/api/api'
import toast, { Toaster } from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const ChangePassword = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    })
    const [password, setPassword] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [passwordCopy, setPasswordCopy] = useState('')
    const [passwordOneType, setPasswordOneType] = useState('password')
    const [passwordTwoType, setPasswordTwoType] = useState('password')
    const [passwordThreeType, setPasswordThreeType] = useState('password')

    const saveAction = () => {
        ChangePasswordApi({
            oldPassword: password,
            newPassword: passwordNew,
            confirmPassword: passwordCopy
        }, localStorage.getItem("token")).then((r) => {
            if (r.data != null) {
                toast.success("Password changed successfully, Login now !")
                localStorage.removeItem("token")
                navigate('/login')
            }
        }).catch((e) => {
            if (e.response) {
                toast.error(e.response.data.message)
            }
        })
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
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
                                                type={passwordOneType}
                                                placeholder="Enter old password"
                                                className='inputborder'
                                            />
                                            <CButton className='shadow-none' type="button" color="info" variant="outline" id="button-addon2" onClick={() => {
                                                passwordOneType === "password" ?
                                                    setPasswordOneType("text")
                                                    : setPasswordOneType("password")
                                            }}>
                                                {passwordOneType === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}

                                            </CButton>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CFormInput
                                                value={passwordNew}
                                                type={passwordTwoType}
                                                onChange={(e) => setPasswordNew(e.target.value)}

                                                placeholder="Enter new password"
                                                className='inputborder'
                                            />
                                            <CButton className='shadow-none' type="button" color="info" variant="outline" id="button-addon2" onClick={() => {
                                                passwordTwoType === "password" ?
                                                    setPasswordTwoType("text")
                                                    : setPasswordTwoType("password")
                                            }}>
                                                {passwordTwoType === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
                                            </CButton>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CFormInput
                                                value={passwordCopy}
                                                type={passwordThreeType}
                                                onChange={(e) => setPasswordCopy(e.target.value)}
                                                placeholder="Enter confirm password"
                                                className='inputborder'
                                            />
                                            <CButton className='shadow-none' type="button" color="info" variant="outline" id="button-addon2" onClick={() => {
                                                passwordThreeType === "password" ?
                                                    setPasswordThreeType("text")
                                                    : setPasswordThreeType("password")
                                            }}>
                                                {passwordThreeType === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
                                            </CButton>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4 loginbtn shadow-none" onClick={saveAction}>
                                                    Save
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default ChangePassword
