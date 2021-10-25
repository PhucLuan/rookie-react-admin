//import { CButton } from '@coreui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import userApi from 'src/api/userApi';
//import { onEdituser } from 'src/Redux/userSlice';

const UserTable = ({ listitem, onEditMode, handlerefreshDeleteItem }) => {

    const dispatch = useDispatch();

    const handleEditUser = (item) => {
        //dispatch(onEdituser(item))
        onEditMode(item.id)
    }
    
    const handleDeleteUser = (id, name) => {
        const deleteUser = async () => {
            try {
                await userApi.delete(id)
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
            deleteUser();            
          }
        
    }

    const items = listitem.map(
        (item,index) => {
            
            return (
                <tr key = {item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.gender}</td>
                    <td>{item.contact}</td>
                    <td>
                        <div style={{ width: "110px" }}>
                            {/* <CButton color="warning" onClick={()=>handleEditUser(item)}>Edit</CButton> */}
                            {' '}
                            {/* <CButton color="danger" onClick={() => handleDeleteUser(item.id,item.name)}>Del</CButton> */}
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
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Contact</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
    )
}

export default UserTable
