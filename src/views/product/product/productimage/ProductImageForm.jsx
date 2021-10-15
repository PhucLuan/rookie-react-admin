import { CButton } from '@coreui/react';
import React from 'react'
import { useHistory, useParams } from 'react-router';

const ProductImageForm = () => {

    const {productId} = useParams();
    const history = useHistory();


    return (
        <div>
            <CButton color="warning" onClick={() => history.goBack()}>Back to list Image</CButton>
            Ahihihi ProductImageForm
        </div>
    )
}

export default ProductImageForm
