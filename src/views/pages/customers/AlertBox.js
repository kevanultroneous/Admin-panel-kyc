/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

export default function AlertBox({ visible, onClose, customTitle, customBody, customFooter, alignment, onNo, onYes, nocolor, yescolor }) {
    return (
        <CModal alignment={alignment ? alignment : "center"} visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>{customTitle ? customTitle : "Remove User"}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {
                    customBody ? customBody :
                        <>
                            Are you sure to remove this Customer Profile ?
                            <div>
                                <small><b>This will remove this customer profile, ratings and reviews</b></small>
                            </div>
                        </>
                }
            </CModalBody>
            <CModalFooter>
                {
                    customFooter ? customFooter :
                        <>
                            <CButton color={nocolor ? nocolor : "danger"} onClick={onNo}>
                                No
                            </CButton>
                            <CButton color={yescolor ? yescolor : "success"} onClick={onYes}>Yes</CButton>
                        </>
                }
            </CModalFooter>
        </CModal>
    )
}