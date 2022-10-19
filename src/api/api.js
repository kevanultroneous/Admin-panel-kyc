/* eslint-disable prettier/prettier */
import axios from "axios"

axios.defaults.headers.common = { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGY5Mzg1OWI3Njc2YmI0ZjJkYzM5MyIsImlhdCI6MTY2NjE1OTUyNywiZXhwIjoxNjY3NDU1NTI3fQ.v75voraoZWsriXT-TVYEAEO2gUGqgbJKYzS-txnUdvw` }
export const Login = () => {
    return false
}
export const ChangePassword = () => {
    return false
}
export const ForgetPassword = () => {
    return false
}
export const getAllCustomer = () => {
    return axios.get(`http://localhost:8000/api/admin/getallcustomers`)
}
export const getAllServiceProvider = () => {
    return axios.get(`http://localhost:8000/api/admin/getAllServiceProviders`)
}