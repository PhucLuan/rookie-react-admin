import { CButton } from '@coreui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import unitApi from 'src/api/unitApi';
import { onEditunit } from 'src/Redux/unitSlice';

const UnitTable = ({ listitem, onEditMode, handlerefreshDeleteItem }) => {

    const dispatch = useDispatch();

    const handleEditUnit = (item) => {
        dispatch(onEditunit(item))
        onEditMode(item.id)
    }
    
    const handleDeleteUnit = (id, name) => {
        const deleteUnit = async () => {
            try {
                await unitApi.delete(id)
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
            deleteUnit();            
          }
        
    }

    const items = listitem.map(
        (item,index) => {
            
            return (
                <tr key = {item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.totalProducts}</td>
                    {/* <td>{item.addedDate}</td>
                    <td>{item.modifiedDate}</td> */}
                    <td>
                        <div style={{ width: "110px" }}>
                            <CButton color="warning" onClick={()=>handleEditUnit(item)}>Edit</CButton>
                            {' '}
                            <CButton color="danger" onClick={() => handleDeleteUnit(item.id,item.name)}>Del</CButton>
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
                    <th scope="col">Action</th>
                    {/* <th scope="col">ModifiedDate</th> */}
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
    )
}

export default UnitTable
