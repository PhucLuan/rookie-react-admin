import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import orderApi from 'src/api/orderApi';
import LayoutFilter from 'src/containers/LayoutFilter';
import OrderDetailTable from './OrderDetailTable';

function OrderDetail() {

    const { orderId } = useParams();

    const [OrderDetail, setOrderDetail] = useState();
    
    const history = useHistory();

    function renderSwitch(param) {
        switch(param) {
          case 'Processing':
            return <CBadge color="info">Processing</CBadge>;
          case 'Complete':
            return <CBadge color="success">Complete</CBadge>;
          default: //pending
            return <CBadge color="warning">Pending</CBadge>;
        }
      }

    useEffect(() => {
        const fetchOrderList = async (orderId) => {
            try {
                const response = await orderApi.getOrderDetail(orderId);
                setOrderDetail(response);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchOrderList(orderId);
    }, [orderId])

    console.log(OrderDetail)
    return (
        <div>
            <CButton
                            onClick={() => history.goBack()}
                            className="mb-2 btn-dark" >
                            Back
                        </CButton>
            {OrderDetail === undefined ? "" :
                <CCard>
                    <CCardHeader>
                        <b><i class="fas fa-money-bill"></i>Bill Infomation</b>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol>
                                <p><b>Total</b> : {OrderDetail.total}</p>
                                <p><b>Payment Method</b> : {OrderDetail.paymentMethod}</p>
                                {renderSwitch(OrderDetail.orderStatus)}
                            </CCol>

                            <CCol>
                                <p><b>Customer</b> : {OrderDetail.customerName}</p>
                                <p><b>Delivery Address</b> : {OrderDetail.deliveryAddress}</p>
                            </CCol>
                        </CRow>
                    </CCardBody>

                    
                </CCard>
                
            }
            <LayoutFilter name="Order Table">
            {OrderDetail !== undefined && <OrderDetailTable listitem = {OrderDetail.orderProductLists}></OrderDetailTable>}
            </LayoutFilter>
            Ahihihi
        </div>
    )
}

export default OrderDetail
