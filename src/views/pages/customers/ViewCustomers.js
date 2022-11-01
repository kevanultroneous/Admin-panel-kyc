/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */

import { useLocation, useNavigate } from "react-router-dom";
import { cilArrowLeft } from "@coreui/icons"
import { CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { MdDeleteForever } from "react-icons/md"
import "./ViewCustomer.css"
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { deleteReview, viewInDetailCustomer } from "src/api/api";
import toast, { Toaster } from "react-hot-toast";
import { NoData, SpinnerView } from "./Nodata";
import AlertBox from "./AlertBox";
/* eslint-disable react/react-in-jsx-scope */
const ViewCustomer = () => {

    const [detailsData, setDetailsData] = useState({})
    const [loader, setLoader] = useState(false)
    const [visible, setVisible] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const [counts, setCounts] = useState(0)
    let navigate = useNavigate()
    let location = useLocation();


    const ViewDetailApi = () => {
        setLoader(true)
        viewInDetailCustomer(location?.state?.item).then((r) => {
            setLoader(false)
            setDetailsData(r.data)
        }).catch((e) => {
            setLoader(false)
            if (e.response) {
                toast.error(e.response.data.message)
            }
        })
    }

    useState(() => {
        ViewDetailApi()

        detailsData?.data?.reviews?.map((v, i) =>

            v?.isActive ? setCounts(i + counts) : null
        )
    }, [detailsData])

    const deleteReviewAction = () => {
        deleteReview(currentId).then((r) => {
            ViewDetailApi()
            setVisible(false)
            toast.success("Review Deleted successfully !")
        }
        ).catch((e) => {
            if (e.response) {
                toast.error(e.response.data.message)
            }
        })
    }

    return (<div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <AlertBox visible={visible}
            alignment="center"
            onClose={() => setVisible(false)}
            customTitle="Delete Review" customBody={<>
                <h6>Are you sure to delete this Review ?</h6>
            </>}
            onNo={() => setVisible(false)}
            onYes={() => deleteReviewAction()}
        />

        {
            loader ? <SpinnerView /> :
                <>
                    {
                        detailsData != null ?
                            <>
                                <CRow className="BigCard">
                                    <CCol xl={12}>
                                        <CIcon icon={cilArrowLeft} color="#000" height={30} onClick={() => navigate('/customers')} />
                                    </CCol>
                                    <CCol xl={6} className="mt-3">
                                        <div>Name : <b>{detailsData?.data?.name}</b></div>
                                        <div className="mt-2">Email: <b>{detailsData?.data?.email}</b></div>
                                        <div className="mt-2">Total reviews received : {detailsData?.data?.totalReviews}</div>
                                    </CCol>
                                    <CCol xl={6} className="mt-3">
                                        <h5>Overall Ratings</h5>
                                        <div><Rating
                                            iconsCount={5}
                                            initialValue={detailsData?.data?.overallRating}
                                            allowFraction
                                            size={25}
                                            emptyColor={"#000"}
                                            readonly
                                        /></div>
                                    </CCol>
                                </CRow>

                                <CRow className="mt-5">
                                    {
                                        detailsData?.data?.reviews?.length > 0 ?
                                            detailsData?.data?.reviews?.map((v, i) =>
                                                v?.isActive === true ?
                                                    <CCol xl={4} key={i}>
                                                        <CRow className="CardOfReview">

                                                            <CRow>
                                                                <CCol xl={6} className="d-flex align-items-center">
                                                                    <CRow>
                                                                        <CCol className="d-flex align-items-center">
                                                                            <div className="SPtext p-0">{v.serviceProviderId?.name}</div><br />
                                                                        </CCol>
                                                                        <CCol>
                                                                            <Rating
                                                                                iconsCount={5}
                                                                                initialValue={v.overallRating}
                                                                                allowFraction
                                                                                size={20}
                                                                                emptyColor={"#000"}
                                                                                readonly
                                                                            />
                                                                        </CCol>
                                                                    </CRow>
                                                                </CCol>
                                                                <CCol xl={6}>
                                                                    <div className="DeleteBtnCover">
                                                                        <CCol xl={12} className="DeleteBtn" onClick={() => {
                                                                            setVisible(true)
                                                                            setCurrentId(v?._id)
                                                                        }}>
                                                                            <MdDeleteForever />
                                                                        </CCol>
                                                                    </div>
                                                                </CCol>
                                                                <CCol>
                                                                </CCol>
                                                            </CRow>
                                                            <CCol xl={12}>
                                                                <div></div>
                                                            </CCol>
                                                            <CCol xl={12} className="ReviewText mt-3">
                                                                {v.review}
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    : null
                                            )
                                            :
                                            <NoData />
                                    }
                                </CRow>
                            </>
                            :
                            <NoData />
                    }

                </>
        }
    </div>)
}
export default ViewCustomer
