import { CButton, CCol, CCollapse, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import productApi from 'src/api/productApi';
import LayoutFilter from 'src/containers/LayoutFilter';
import ProductFilter from './ProductFilter';
import ProductTable from './ProductTable';

const initialFilter = {
    categoryId: "",
    brandId: "",
    keySearch: "",
    orderProperty: "",
    desc: true,
    page: 1,
    limit: 5,
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
        console.log("Call Api")
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

    const [visibleA, setVisibleA] = useState(false)

    return (
        <div>
            <CButton color="info" className='mb-2' onClick={() => history.push("/product/product/add")}>Add</CButton>
            {'  '}
            <CButton color="secondary " className='mb-2' onClick={() => setVisibleA(!visibleA)}>Filter</CButton>
            <CRow>
                <CCol xs={12}>
                    <CCollapse show={visibleA} >
                        <ProductFilter Filterlist = {Filterlist} initialFilter={initialFilter} handleSubmitForm = {(values) => handleSubmitForm(values)} />
                    </CCollapse>
                </CCol>
            </CRow>

            <LayoutFilter name="Product table">
                {Products !== undefined &&
                    <ProductTable
                        listitem={Products.items}
                        handlerefreshDeleteItem={handlerefresh} />}

                <div>
                    <CButton onClick={() => prevPage(Filter)} >Previous</CButton>
                    {' '}
                    <CButton onClick={() => nextPage(Filter)} >Next</CButton>
                </div>
            </LayoutFilter>
        </div>
    )
}

export default Product
