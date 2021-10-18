import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CInputGroupText, CRow
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useParams } from 'react-router'
import productImageApi from 'src/api/productImageApi'
import ProductImageForm from './ProductImageForm'
import ProductImageTable from './ProductImageTable'

const ProductImage = () => {

    const [isRefresh, setisRefresh] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [productImageId, setproductImageId] = useState()

    const [ProductImages, setProductImages] = useState();

    const {productId} = useParams();

    const customStyles = {
        content: {
            top: '55%',
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

    function onAddProductImage() {
        setproductImageId(undefined)
        openModal();
    }

    const handlerefresh = () => {
        setisRefresh(!isRefresh);
    }

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await productImageApi.getByProductId(productId);
                setProductImages(response);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();


    }, [isRefresh])

    const handleEditProductImage = (Id) => {
        setproductImageId(Id);
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
                            onClick={() => onAddProductImage()}
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
                            {ProductImages !== undefined && <ProductImageTable listitem={ProductImages}
                                onEditMode={handleEditProductImage}
                                handlerefreshDeleteItem={handlerefresh}></ProductImageTable>}
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
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                {/* <button onClick={closeModal}>close</button> */}
                <div className='clearfix'></div>
                <ProductImageForm 
                    productImageId={productImageId} 
                    handlerefresh={handlerefresh} 
                    closeModal={closeModal}
                    productId={productId}></ProductImageForm>
            </Modal>
        </>
    )
}

export default ProductImage
