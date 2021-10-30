import React from 'react'
import ReactTable from 'src/reusable/ReactTable';

const ProductCommentTable = ({listitem}) => {

    const columns = React.useMemo(
        () => [
          {
            Header: 'Product List',
            columns: [
            {
                Header: 'User ID',
                accessor: 'userId',
                },
              {
                Header: 'Product Name',
                accessor: 'productName',
              },
              {
                Header: 'Comment',
                accessor: 'comment',
              },
              {
                Header: 'Rating',
                accessor: 'rating',
              },
              {
                Header: 'Add Date',
                accessor: 'addedDate',
              }
            ],
          }],
        []
      )

    return (
        <>
             <ReactTable columns={columns} data={listitem} ></ReactTable>
        </>
    )
}

export default ProductCommentTable;
