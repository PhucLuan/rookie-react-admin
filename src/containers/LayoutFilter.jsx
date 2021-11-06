import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React from 'react'

const LayoutFilter = ({ children, name }) => {
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        {name}
                    </CCardHeader>
                    <CCardBody>
                        {children}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default LayoutFilter
