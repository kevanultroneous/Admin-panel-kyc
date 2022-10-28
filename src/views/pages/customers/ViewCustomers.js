/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */

import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { cilArrowLeft } from "@coreui/icons"
import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { viewCustomerDetail } from "./dummyList";
import { MdDelete, MdDeleteForever } from "react-icons/md"
import { AiFillStar } from "react-icons/ai"
import "./ViewCustomer.css"
import { Rating } from "react-simple-star-rating";
/* eslint-disable react/react-in-jsx-scope */
const ViewCustomer = () => {
    let navigate = useNavigate()
    let location = useLocation();
    console.log(location);
    return (<div>
        <CTable align="middle" className="mb-0 border" hover responsive style={{ border: "none !important" }}>
            <CTableHead >
                <CTableRow >
                    <CTableHeaderCell colSpan={viewCustomerDetail.length}>
                        <CIcon icon={cilArrowLeft} color="#000" height={30} onClick={() => navigate('/customers')} />
                    </CTableHeaderCell>
                </CTableRow>
                <CTableRow >
                    {viewCustomerDetail.map((value, index) =>
                        <CTableHeaderCell key={index} className="text-center">
                            {value}
                        </CTableHeaderCell>)}
                </CTableRow>

            </CTableHead>
            <CTableBody >
                <CTableRow v-for="item in tableItems" >
                    <CTableDataCell className="text-center">
                        <div>{location.state.item.name}</div>
                    </CTableDataCell >
                    <CTableDataCell className="text-center">
                        <div>{location.state.item.totalReviews}</div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                        <div><Rating
                            iconsCount={5}
                            initialValue={location.state.item.overallRating}
                            allowFraction
                            size={20}
                            readonly
                        /></div>
                    </CTableDataCell>

                </CTableRow>
            </CTableBody>
        </CTable>
        <CRow className="mt-5">
            {
                [0, 1, 2, 3, 4, 5].map((v, i) =>
                    <CCol xl={4} key={i}>
                        <CRow className="CardOfReview">
                            <div className="DeleteBtnCover">
                                <CCol xl={12} className="DeleteBtn"><MdDeleteForever /></CCol>
                            </div>
                            <CCol xl={12} className="SPtext">John martin</CCol>
                            <CCol xl={12} className="ReviewText">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</CCol>
                        </CRow>
                    </CCol>
                )
            }
        </CRow>
    </div>)
}
export default ViewCustomer
