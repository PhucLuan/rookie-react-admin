import { CButton } from '@coreui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import brandApi from 'src/api/brandApi';
import { onEditbrand } from 'src/Redux/brandSlice';

const BrandTable = ({ listitem, onEditMode, handlerefreshDeleteItem }) => {

    const dispatch = useDispatch();

    const handleEditBrand = (item) => {
        dispatch(onEditbrand(item))
        onEditMode(item.id)
    }
    
    const handleDeleteBrand = (id, name) => {
        const deleteBrand = async () => {
            try {
                await brandApi.delete(id)
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
            deleteBrand();            
          }
        
    }

    const items = listitem.map(
        (item,index) => {
            
            return (
                <tr key = {item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.totalProduct}</td>
                    <td>{item.addedDate}</td>
                    <td>{item.modifiedDate}</td>
                    <td>
                        <div style={{ width: "110px" }}>
                            <CButton color="warning" onClick={()=>handleEditBrand(item)}>Edit</CButton>
                            {' '}
                            <CButton color="danger" onClick={() => handleDeleteBrand(item.id,item.name)}>Del</CButton>
                        </div>
                    </td>
                </tr>
            )
        }

    )

    return (
        <table responsive="true" hover = "true" width="100%">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">TotalProduct</th>
                    <th scope="col">AddedDate</th>
                    <th scope="col">ModifiedDate</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
    )
}

export default BrandTable
