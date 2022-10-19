/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
export default function ViewModel({ size, visibleView, alignment = "center", onClose, hideheader = false, hidefooter = false, hidebody = false, title, body, footer }) {
    return (
        <CModal alignment={alignment} visible={visibleView} onClose={onClose} size={size === 1 ? 'sm' : size === 2 ? 'lg' : size === 3 ? 'xl' : 'sm'}>
            {
                hideheader ?
                    <></>
                    :
                    <CModalHeader>
                        <CModalTitle>{title}</CModalTitle>
                    </CModalHeader>
            }
            {
                hidebody ? <></> :
                    <CModalBody>
                        {body}
                    </CModalBody>
            }
            {
                hidefooter ?
                    <></>
                    :
                    <CModalFooter>
                        {footer}
                    </CModalFooter>
            }
        </CModal>
    )
}