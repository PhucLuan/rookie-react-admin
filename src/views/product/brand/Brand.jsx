import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CInputGroupText, CRow
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { onFetchdata } from 'src/Redux/brandSlice'
import BrandForm from './BrandForm'
import BrandTable from './BrandTable'

const Brand = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const [brandId, setbrandId] = useState()

    const isRefresh = useSelector(state => state.brand.isRefresh)

    
    const Brands = useSelector(state => state.brand.brands)
    
    const customStyles = {
        content: {
            top: '40%',
            left: '60%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%'
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        //setisRefresh(!isRefresh)
        setIsOpen(false);
    }

    function onAddBrand() {
        setbrandId(undefined)
        openModal();
    }
    
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(onFetchdata());

    }, [dispatch,isRefresh])

    const handleEditBrand = (Id) => {
        setbrandId(Id);
        openModal();
    }

    Modal.setAppElement('#root');

    return (
        <>
            <div id='mymodal'></div>
            <CRow>
                <CCol xs="12" lg="2">
                    <CCardBody>
                        <CButton
                            onClick={() => onAddBrand()}
                            className="mr-1 btn-info"
                        >Add</CButton>
                    </CCardBody>
                </CCol>
                <CCol lg="4">
                    <CCardBody>
                        <CInputGroup>
                            <CInput placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <CInputGroupText>Search</CInputGroupText>
                        </CInputGroup>
                    </CCardBody>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Combined All Table
                        </CCardHeader>
                        <CCardBody>
                            {Brands !== undefined && <BrandTable listitem={Brands}
                                onEditMode={handleEditBrand}></BrandTable>}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='clearfix'></div>
                <BrandForm brandId={brandId}></BrandForm>
            </Modal>
        </>
    )
}

export default Brand
