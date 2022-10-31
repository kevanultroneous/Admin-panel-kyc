/* eslint-disable prettier/prettier */
import axios from "axios"
import { api_link } from "src/utils/defaults"


export const LoginApi = (data) => {
    return axios.post(`${api_link}api/serviceprovider/signin`, data)
}
export const ChangePasswordApi = (data, token) => {
    return axios.post(`${api_link}api/serviceprovider/changePassword`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}
export const ForgetPassword = (data) => {
    return axios.post(`${api_link}api/serviceprovider/forgetPassword`, data)
}
export const ResetPassoword = (data, token) => {
    return axios.post(`${api_link}api/serviceprovider/resetPassword`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}
export const OTPverify = (data, token) => {
    return axios.post(`${api_link}api/serviceprovider/verifyOtp`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}
export const getAllCustomer = () => {
    return axios.get(`${api_link}api/admin/getallcustomers`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
export const getAllServiceProvider = () => {
    return axios.get(`${api_link}api/admin/getAllServiceProviders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
export const setBlockOrUnblockUser = (data) => {
    return axios.post(`${api_link}api/admin/blockuser`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
export const customerSearch = (data) => {
    return axios.post(`${api_link}api/admin/search`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
export const viewInDetailCustomer = (id) => {
    return axios.post(`${api_link}api/admin/getAllCustomers`, { id: id }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
export const deleteReview = (id) => {
    return axios.post(`${api_link}api/serviceprovider/deleteReview`, { id: id }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
}
