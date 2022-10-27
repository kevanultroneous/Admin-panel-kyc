/* eslint-disable prettier/prettier */
import axios from "axios"

export const LoginApi = (data) => {
    return axios.post(`http://localhost:8000/api/serviceprovider/signin`, data)
}
export const ChangePassword = (data) => {
    return axios.post(`http://localhost:8000/api/serviceprovider/changePassword`, data)
}
export const ForgetPassword = (data) => {
    return axios.post(`http://localhost:8000/api/serviceprovider/forgetPassword`, data)
}
export const OTPverify = (data) => {
    return axios.post(`http://localhost:8000/api/serviceprovider/verifyOtp`, data)
}
export const getAllCustomer = () => {
    return axios.get(`http://localhost:8000/api/admin/getallcustomers`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
export const getAllServiceProvider = () => {
    return axios.get(`http://localhost:8000/api/admin/getAllServiceProviders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
export const setBlockOrUnblockUser = (data) => {
    return axios.post(`http://localhost:8000/api/admin/blockuser`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
export const customerSearch = (data) => {
    return axios.post(`http://localhost:8000/api/serviceprovider/search`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}