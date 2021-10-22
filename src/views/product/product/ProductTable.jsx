import { CButton } from '@coreui/react'
import React from 'react'
import { useHistory } from 'react-router';
import productApi from 'src/api/productApi';
import 'src/style/admin.css';
import ReactTable from 'src/reusable/ReactTable';

const ProductTable = ({ listitem, handlerefreshDeleteItem }) => {

    const history = useHistory();

    const handleDeleteProduct = (id, name) => {
        const deleteProduct = async () => {
            try {
                await productApi.delete(id)
                    .then(res => {
                        alert(res);
                        handlerefreshDeleteItem();
                    });
                ;
            } catch (error) {
                alert(error)
            }
        }
        if (window.confirm("Are you sure you want to delete: " + name + " ?")) {
            deleteProduct();
        }
    }

    const columns = React.useMemo(
        () => [
          {
            Header: 'Product List',
            columns: [
            {
                Header: 'Product ID',
                accessor: 'id',
                },
              {
                Header: 'Pricture',
                Cell: ({row}) => {
                    return <div><img height={80} src={row.original.imagePath} alt={row.original.name} /></div>
                  },
                  accessor: 'imagePath',
              },
              {
                Header: 'Product Name',
                accessor: 'name',
              },
              {
                Header: 'Code',
                accessor: 'code',
              },
              {
                Header: 'Price',
                accessor: 'price',
              },
              {
                Header: 'Stock quantity',
                accessor: 'productStock',
              },
              {
                Header: 'Published',
                Cell: (row) => {
                    return  <input type="checkbox" checked={row.cell.value} disabled />
                  },
                accessor: 'ispublish',
              },
              {
                Header: 'Action',
                Cell: ({row}) => (
                    <div>
                        <CButton color="warning" onClick={() => history.push(`/product/product/${row.original.id}`)}>Edit</CButton>
                        {' '}
                        <CButton color="danger" onClick={() => handleDeleteProduct(row.original.id, row.original.name)}>Delete</CButton>
                    </div>
                )
              },
            ],
          }],
        [history]
      )

    return (
        <>
            <ReactTable columns={columns} data={listitem} ></ReactTable>
        </>
    )
}

export default ProductTable
