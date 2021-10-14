import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CInputGroupText, CRow
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import unitApi from 'src/api/unitApi'
import UnitForm from './UnitForm'
import UnitTable from './UnitTable'

const Unit = () => {

    const [isRefresh, setisRefresh] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [unitId, setunitId] = useState()

    const [Units, setUnits] = useState();

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

    function onAddUnit() {
        setunitId(undefined)
        openModal();
    }

    const handlerefresh = () => {
        setisRefresh(!isRefresh);
    }

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await unitApi.getAll();
                setUnits(response);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();


    }, [isRefresh])

    const handleEditUnit = (Id) => {
        setunitId(Id);
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
                            onClick={() => onAddUnit()}
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
                            {Units !== undefined && <UnitTable listitem={Units}
                                onEditMode={handleEditUnit}
                                handlerefreshDeleteItem={handlerefresh}></UnitTable>}
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
                <UnitForm unitId={unitId} handlerefresh={handlerefresh} closeModal={closeModal}></UnitForm>
            </Modal>
        </>
    )
}

export default Unit
