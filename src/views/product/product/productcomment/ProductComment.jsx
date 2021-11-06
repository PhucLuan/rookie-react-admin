import { CButton, CCardBody, CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import productCommentApi from 'src/api/productCommentApi';
import LayoutFilter from 'src/containers/LayoutFilter';
import ProductCommentTable from './ProductCommentTable';

const ProductComment = () => {

    const [ProductComments, setProductComments] = useState();
    const { productId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await productCommentApi.getAllbyProduct(productId);
                setProductComments(response);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();


    }, [productId])
    console.log({ ProductComments })
    return (
        <>
            <CRow>
                <CCol xs="12" lg="2">
                    <CCardBody>
                        <CButton
                            onClick={() => history.goBack()}
                            className="mr-1 btn-dark" >
                            Back
                        </CButton>
                    </CCardBody>
                </CCol>
            </CRow>
            <LayoutFilter name="Comment Table">
                {ProductComments && <ProductCommentTable listitem={ProductComments} />}
            </LayoutFilter>
        </>
    )
}

export default ProductComment
