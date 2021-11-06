import React from 'react';
import ReactTable from 'src/reusable/ReactTable';
import 'src/style/admin.css';

const OrderDetailTable = ({ listitem }) => {

    const columns = [
        {
            Header: 'OrderDetail List',
            columns: [
                {
                    Header: 'Pricture',
                    Cell: ({ row }) => {
                        return <div><img height={80} src={row.original.imagePath} alt={row.original.name} /></div>
                    },
                    accessor: 'imagePath',
                },
                {
                    Header: 'Product',
                    accessor: 'productName',
                },
                {
                    Header: 'Brand',
                    accessor: 'brandName',
                },
                {
                    Header: 'Quantity',
                    accessor: 'quantity',
                },
                {
                    Header: 'Price',
                    accessor: 'price',
                },
                {
                    Header: 'Total',
                    accessor: 'finalPrice',
                },
            ],
        }];
    //   [history]
    // )

    return (
        <>
            <ReactTable columns={columns} data={listitem} ></ReactTable>
        </>
    )
}

export default OrderDetailTable
