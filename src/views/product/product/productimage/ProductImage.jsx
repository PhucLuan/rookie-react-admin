import { CButton } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import productImageApi from 'src/api/productImageApi';
import ProductImageTable from './ProductImageTable';

const ProductImage = () => {

    const {productId} = useParams();

    const [ProductImages, setProductImages] = useState()
    const history = useHistory();

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await productImageApi.getByProductId(productId);
                setProductImages(response);
                console.log({response})
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();
    }, [])

    console.log({productId})
    return (
        <div>
            <CButton color="warning" onClick={() => history.push(`/product/product/${productId}`)}>Back to product</CButton>
            <CButton color="info" onClick={() => history.push("/product/product/productimage/add")}>Add</CButton>
            {ProductImages && 
            <ProductImageTable listitem={ProductImages} />}
        </div>
    )
}

export default ProductImage
