/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { CButton, CFormInput, CFormSwitch, CInputGroup, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'


import { useEffect, useState } from 'react'
import { customerSearch, getAllCustomer, setBlockOrUnblockUser } from 'src/api/api'
import AlertBox from './AlertBox'
import { customerField } from './dummyList'
import { NoData, SpinnerView } from './Nodata'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Customers() {

    const [tableData, setTableData] = useState([])
    const [loader, setLoader] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [titleOfModel, setTitleOfModel] = useState("Block")
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        getMyCustomer()
    }, [])

    const getMyCustomer = () => {
        setLoader(true)
        getAllCustomer()
            .then((r) => {
                setLoader(false)
                setTableData(r.data.data)
            }).catch((e) => {
                setLoader(false)
                console.log(e)
            })
    }

    const callSearch = (input) => {
        setLoader(true)
        setTimeout(() => {
            customerSearch({ searchText: input }).then((r) => {
                setLoader(false)
                setTableData(r.data.data)
            }).catch((e) => {
                setLoader(false)
                if (e.response) {
                    toast.error(e.response.data.message)
                }
            })
        }, 1000)
    }



    const handleBlockUnblock = (e) => {
        setVisible2(true)
        if (e.target.checked) {
            setTitleOfModel("Block")
        } else {
            setTitleOfModel("Unblock")
        }
    }

    const callBlockAction = (id) => {

        setBlockOrUnblockUser(id).then((r) => {
            getMyCustomer()
            setVisible2(false)
        }).catch((e) => {
            if (e.response) {
                toast.error(e.response.data.message)
            }
        })
    }

    return (
        <div>
            {/* Alert box and View data model */}
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <AlertBox
                customTitle={titleOfModel + " Service Provider"}
                customBody={
                    <>
                        <h6>Are you sure to <b>{titleOfModel} {currentUser?.name}</b>  Customer ?</h6>
                        {
                            titleOfModel === "Block" &&
                            <h6>This person will no longer be able to interact with you in KYC.</h6>
                        }
                    </>
                } visible={visible2}
                onClose={() => setVisible2(false)}
                onNo={() => setVisible2(false)}
                onYes={() => callBlockAction({ userId: currentUser?._id, type: "customer" })} />
            <AlertBox visible={visible} onClose={() => setVisible(false)} onNo={() => setVisible(false)} onYes={() => null} />

            {/* Search bar */}
            <CInputGroup className="mb-3">
                <CFormInput
                    className='shadow-none'
                    placeholder="Search by Name or Email id or Phone number"
                    value={searchInput}
                    aria-label="Name or Email id or Phone number" aria-describedby="button-addon2" onChange={(e) => {
                        callSearch(e.target.value)
                        setSearchInput(e.target.value)
                    }} />
                <CButton className='shadow-none' type="button" color="info" variant="outline" id="button-addon2" onClick={() => setSearchInput("")}>
                    Clear
                </CButton>
            </CInputGroup>

            {/* Data table */}
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        {customerField.map((v, i) => <CTableHeaderCell key={i}>{v}</CTableHeaderCell>)}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        loader ? <SpinnerView /> :
                            tableData.length > 0 ?
                                tableData?.map((item, index) => (

                                    <CTableRow v-for="item in tableItems" key={index}>
                                        {console.log(item)}
                                        <CTableDataCell>
                                            <div>{index + 1}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.name}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.email}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.contact}</div>
                                        </CTableDataCell>

                                        <CTableDataCell>
                                            <Link to={{ pathname: "/view-customer" }} state={{ item: item._id }}>View Profile
                                            </Link>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CFormSwitch id={`switchblock${index}`} type='checkbox'
                                                checked={item.isActive}
                                                onChange={(e) => {
                                                    setCurrentUser(item)
                                                    handleBlockUnblock(e)
                                                }}
                                            />
                                        </CTableDataCell>
                                    </CTableRow>
                                ))
                                : <NoData />
                    }
                </CTableBody>
            </CTable>
        </div>
    )
}
