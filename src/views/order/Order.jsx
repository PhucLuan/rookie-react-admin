import {
    CButton, CFormGroup
} from '@coreui/react'
import { FastField, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import orderApi from 'src/api/orderApi'
import LayoutFilter from 'src/containers/LayoutFilter'
import InputField from 'src/custom-fields/InputField'
import OrderTable from './OrderTable'

const initialFilter = {
    keySearch: "",
    page: 1,
    limit: 4
}

const Order = () => {

    const [isRefresh, setisRefresh] = useState(false);

    const [Orders, setOrders] = useState();

    const [Filter, setFilter] = useState(initialFilter);


    useEffect(() => {
        const fetchOrderList = async (filter) => {
            try {
                const response = await orderApi.find(filter);
                setOrders(response);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchOrderList(Filter);
    }, [isRefresh, Filter])


    const handleSubmitForm = (filter) => {
        setFilter(filter);
        setisRefresh(!isRefresh);
    }

    const prevPage = (filter) => {
        const pg = filter.page === 1 ? 1 : filter.page - 1;
        setFilter({ ...Filter, page: pg });
        setisRefresh(!isRefresh);

    }
    const nextPage = (filter) => {
        const pg = filter.page < Math.ceil(Orders.totalItems / filter.limit) ? filter.page + 1 : filter.page;
        setFilter({ ...Filter, page: pg });
        setisRefresh(!isRefresh);

    }

    return (
        <>
            <LayoutFilter name="Filter">
                <Formik
                    initialValues={initialFilter}
                    onSubmit={(values) => handleSubmitForm(values)}
                >
                    {formikProps => {
                        return (
                            <>
                                <Form>
                                    <FastField
                                        name="limit"
                                        component={InputField}
                                        type="number"
                                        label="Item_per_page"
                                    />
                                    <CFormGroup>
                                        <CButton type="submit" color="primary">Search</CButton>
                                    </CFormGroup>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </LayoutFilter>
            <LayoutFilter name="Order Table">
                {Orders !== undefined && <OrderTable listitem={Orders.items}></OrderTable>}

                <div>
                    <CButton onClick={() => prevPage(Filter)} >Previous</CButton>
                    {' '}
                    <CButton onClick={() => nextPage(Filter)} >Next</CButton>
                </div>
            </LayoutFilter>
        </>
    )
}

export default Order
