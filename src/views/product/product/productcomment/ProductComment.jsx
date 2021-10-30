import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import productCommentApi from 'src/api/productCommentApi'
import ProductCommentTable from './ProductCommentTable';

const ProductComment = () => {

    const [ProductComments, setProductComments] = useState();
    const { productId } = useParams();
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
    console.log({ProductComments})
    return (
        <div>
            {ProductComments&&<ProductCommentTable listitem = {ProductComments}  />}
        </div>
    )
}

export default ProductComment
