import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CRow } from '@coreui/react'
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import productApi from 'src/api/productApi';
import InputField from 'src/custom-fields/InputField';
import SelectField from 'src/custom-fields/SelectField';
import ProductTable from './ProductTable';


const initialFilter = {
    categoryId: 0,
    brandId: 0,
    keySearch: "",
    orderProperty: "",
    desc: true,
    page: 1,
    limit: 2
}

const Product = () => {

    const history = useHistory();
    const [Products, setProducts] = useState();
    const [isRefresh, setisRefresh] = useState(false);

    const [Filterlist, setFilterlist] = useState();

    const [Filter, setFilter] = useState(initialFilter)

    const fetchProductList = async (filter) => {
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await productApi.find(filter);
            console.log({ response })
            setProducts(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    useEffect(() => {

        const fetchFilterlist = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await productApi.getFilter();
                setFilterlist(response);
                console.log({ response })
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }


        fetchFilterlist();
        fetchProductList(Filter);

    }, [isRefresh, Filter])

    const handlerefresh = () => {
        setisRefresh(!isRefresh);
    }

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
        const pg = filter.page < Math.ceil(Products.totalItems / filter.limit) ? filter.page + 1 : filter.page;
        setFilter({ ...Filter, page: pg });
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
                            {Filterlist === undefined ? '' :
                                <Formik
                                    initialValues={initialFilter}
                                    onSubmit={(values) => handleSubmitForm(values)}
                                >
                                    {formikProps => {
                                        // do something here ...
                                        const { values, errors, touched } = formikProps;
                                        console.log({ values, errors, touched });
                                        return (
                                            <>
                                                <Form>
                                                    <FastField
                                                        name="limit"
                                                        component={InputField}
                                                        type="number"
                                                        label="Item_per_page"
                                                    />
                                                    <FastField
                                                        name="keySearch"
                                                        component={InputField}

                                                        label="KeySearch"
                                                        placeholder="KeySearch"
                                                    />
                                                    <FastField
                                                        name="brandId"
                                                        component={SelectField}

                                                        label="Brand"
                                                        placeholder="What's your product brand?"
                                                        options={Filterlist.brandList.map(
                                                            (category) => {
                                                                return (
                                                                    { value: category.id, label: category.name }
                                                                )
                                                            }
                                                        )}
                                                    />
                                                    <FastField
                                                        name="categoryId"
                                                        component={SelectField}

                                                        label="Category"
                                                        placeholder="What's your product category?"
                                                        options={Filterlist.categoryList.map(
                                                            (category) => {
                                                                return (
                                                                    { value: category.id, label: category.name }
                                                                )
                                                            }
                                                        )}
                                                    />
                                                    <CFormGroup>
                                                        <CButton type="submit" color="primary">Search</CButton>
                                                    </CFormGroup>
                                                </Form>
                                            </>
                                        );
                                    }}
                                </Formik>
                            }

                            {Products !== undefined &&
                                <ProductTable
                                    listitem={Products.items}
                                    handlerefreshDeleteItem={handlerefresh} />}
                            <div>
                            <CButton onClick={() => prevPage(Filter)} >Previous</CButton>
                            {' '}
                            <CButton onClick={() => nextPage(Filter)} >Next</CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default Product
