import { CButton } from '@coreui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ParseDateTime } from 'src/Helper/ParseDateTime';
import { onDeletebrand, onEditbrand } from 'src/Redux/brandSlice';
import ReactTable from 'src/reusable/ReactTable';

const BrandTable = ({ listitem, onEditMode }) => {

    const dispatch = useDispatch();

    const handleEditBrand = (item) => {
        console.log(item)
        dispatch(onEditbrand(item))
        onEditMode(item.id)
    }
    
    const handleDeleteBrand = (id, name) => {
        if (window.confirm("Are you sure you want to delete: "+name+" ?")) {
            dispatch(onDeletebrand(id));            
          }
        
    }

    const columns = [
        {
          Header: 'Brand List',
          columns: [
          {
              Header: 'ID',
              accessor: 'id',
              },
            {
              Header: 'Brand Name',
              accessor: 'name',
            },
            {
              Header: 'Brand Description',
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
                      <CButton color="warning" onClick={()=>handleEditBrand(row.original)}>Edit</CButton>
                      {' '}
                      <CButton color="danger" onClick={() => handleDeleteBrand(row.original.id,row.original.name)}>Delete</CButton>
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

export default BrandTable
