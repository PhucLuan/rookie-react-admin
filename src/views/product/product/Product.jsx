import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import productApi from 'src/api/productApi';
import ProductTable from './ProductTable';

const Product = () => {

    const history = useHistory();
    const [Products, setProducts] = useState();
    const [isRefresh, setisRefresh] = useState(false);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await productApi.getAll();
                setProducts(response);
                console.log({response})
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();
    }, [isRefresh])

    const handlerefresh = () => {
        setisRefresh(!isRefresh);
    }

    return (
        <div>
            <CButton color="info" onClick={() => history.push("/product/product/add")}>Add</CButton>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Combined All Table
                        </CCardHeader>
                        <CCardBody>
                            {Products !== undefined && 
                            <ProductTable 
                                listitem={Products}
                                handlerefreshDeleteItem={handlerefresh} />}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default Product
