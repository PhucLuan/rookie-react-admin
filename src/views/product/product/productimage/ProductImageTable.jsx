import { CButton } from '@coreui/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import productImageApi from 'src/api/productImageApi';
import 'src/style/admin.css';
import { onEditproductImage } from 'src/Redux/productimageSlide';
import { ParseDateTime } from 'src/Helper/ParseDateTime';

const ProductImageTable = ({ listitem, onEditMode, handlerefreshDeleteItem }) => {

    //const history = useHistory();

    const dispatch = useDispatch();

    const handleEditProductImage = (item) => {
        dispatch(onEditproductImage(item))
        onEditMode(item.id)
    }

    const handleDeleteProductImage = (id,publicId, name) => {
        const deleteProductImage = async () => {
            try {
                await productImageApi.delete(id,publicId)
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
            deleteProductImage();
        }
    }
    console.log({listitem})
    const items = listitem.map(
        (item, index) => {

            return (
                <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>
                        {item.productName}
                    </td>
                    <td>
                        {item.title}
                    </td>
                    <td>
                        <img width="100px" src={item.imagePath} alt={item.title} />
                    </td>
                    <td>
                        <input type="checkbox" checked={item.ispublish} disabled/>
                    </td>
                    <td>
                        {item.publicId}
                    </td>
                    <td>
                        {ParseDateTime(item.addedDate)}
                    </td>
                    {/* <td>
                        <p><b>Comment</b> {item.productImageComments}</p>
                        <p><b>Rating</b> {item.averageRating}%</p>
                    </td>
                    <td>{item.totalImage}</td>
                    <td>
                        <p><b>AddedDate</b> {item.addedDate}</p>
                        <p><b>ModifiedDate</b> {item.modifiedDate}%</p>
                    </td>
                    <td>
                    <input type="checkbox" checked={item.ispublish} disabled/>
                    </td> */}
                    <td>
                        <div style={{ width: "110px" }}>
                            <CButton color="warning" 
                                onClick={()=>handleEditProductImage(item)} >
                             Edit
                            </CButton>
                            {' '}
                            <CButton color="danger" 
                                onClick={() => handleDeleteProductImage(item.id,item.publicId,item.title)}>
                             Del
                            </CButton>
                        </div>
                    </td>
                </tr>
            )
        }

    )

    return (
        <table responsive="true" hover="true" width="100%">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Publish</th>
                    <th scope="col">Public ID (cloudinary)</th>
                    <th scope="col">Add date</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
            <tfoot>
                <tr>
                    <th>paging</th>
                </tr>
            </tfoot>
        </table>
    )
}

export default ProductImageTable
