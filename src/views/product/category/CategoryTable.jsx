import { CButton } from '@coreui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import categoryApi from 'src/api/categoryApi';
import { onEditcategory } from 'src/Redux/categorySlice';

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

    const items = listitem.map(
        (item,index) => {
            
            return (
                <tr key = {item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.order}</td>
                    <td>{item.categoryParentName}</td>
                    <td>{item.description}</td>
                    <td>{item.totalProduct}</td>
                    <td>
                        <input type="checkbox" checked={item.ispublish} disabled/>
                    </td>
                    <td>{item.addedDate}</td>
                    <td>{item.modifiedDate}</td>
                    <td>
                        <div style={{ width: "110px" }}>
                            <CButton color="warning" onClick={()=>handleEditCategory(item)}>Edit</CButton>
                            {' '}
                            <CButton color="danger" onClick={() => handleDeleteCategory(item.id,item.name)}>Del</CButton>
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
                    <th scope="col">Order</th>
                    <th scope="col">Category Parent</th>
                    <th scope="col">Description</th>
                    <th scope="col">TotalProduct</th>
                    <th scope="col">Ispublish</th>
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

export default CategoryTable
