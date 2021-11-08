import { CButton } from '@coreui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import categoryApi from 'src/api/categoryApi';
import { ParseDateTime } from 'src/Helper/ParseDateTime';
import { onEditcategory } from 'src/Redux/categorySlice';
import ReactTable from 'src/reusable/ReactTable';

const CategoryTable = ({ listitem, onEditMode, handlerefreshDeleteItem }) => {

    const dispatch = useDispatch();

    const handleEditCategory = (item) => {
        dispatch(onEditcategory(item))
        onEditMode(item.id)
    }
    
    const handleDeleteCategory = (id, name) => {
        const deleteCategory = async () => {
            try {
                await categoryApi.delete(id)
                .then(res => 
                    {
                        alert(res);
                        handlerefreshDeleteItem();
                    });
                ;                
            } catch (error) {
                alert(error)
            }
        }
        if (window.confirm("Are you sure you want to delete: "+name+" ?")) {
            deleteCategory();            
          }
        
    }
    
    
    const columns = [
        {
          Header: 'Category List',
          columns: [
          {
              Header: 'ID',
              accessor: 'id',
              },
            {
              Header: 'Category Name',
              accessor: 'name',
            },
            {
                Header: 'Order',
                accessor: 'order',
              },
              {
                Header: 'Category Parent',
                accessor: 'categoryParentName',
              },
            {
              Header: 'Category Description',
              accessor: 'description',
            },
            {
              Header: 'TotalProduct',
              accessor: 'totalProduct',
            },
            {
              Header: 'Addeddate',
              accessor: 'addedDate',
              Cell: ({row}) => (
                <div>
                  {/* {row.original.addedDate} */}
                {ParseDateTime(row.original.addedDate)}
                </div>
            )
            },
            {
              Header: 'ModifiedDate',
              accessor: 'modifiedDate',
              Cell: ({row}) => (
                <div>
                  {/* {row.original.addedDate} */}
                {ParseDateTime(row.original.modifiedDate)}
                </div>
            )
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
                      <CButton color="warning" onClick={()=>handleEditCategory(row.original)}>Edit</CButton>
                      {' '}
                      <CButton color="danger" onClick={() => handleDeleteCategory(row.original.id,row.original.name)}>Delete</CButton>
                  </div>
              )
            },
          ],
        }];

    return (
        <>
            <ReactTable columns={columns} data={listitem} ></ReactTable>
        </>
    )
}

export default CategoryTable
