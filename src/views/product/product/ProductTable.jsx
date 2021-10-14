import { CButton } from '@coreui/react'
import React from 'react'
import { useHistory } from 'react-router';
import productApi from 'src/api/productApi';
import 'src/style/admin.css';

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

    const items = listitem.map(
        (item, index) => {

            return (
                <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>
                        <p><b>Name</b> {item.name}</p>
                        <p><b>Code</b> {item.code}</p>
                        <p><b>Tag</b> {item.tag}</p>
                    </td>
                    <td>
                        <p><b>Category</b> {item.categoryName}</p>
                        <p><b>Product</b> {item.productName}</p>
                    </td>
                    <td>
                        <p><b>Current Price</b> {item.price}</p>
                        <p><b>Regular Price</b> {item.finalPrice}</p>
                        <p><b>Discount</b> {item.discount}%</p>
                    </td>
                    <td>
                        <p><b>Comment</b> {item.productComments}</p>
                        <p><b>Rating</b> {item.averageRating}%</p>
                    </td>
                    <td>{item.totalImage}</td>
                    <td>
                        <p><b>AddedDate</b> {item.addedDate}</p>
                        <p><b>ModifiedDate</b> {item.modifiedDate}%</p>
                    </td>
                    <td>
                    <input type="checkbox" checked={item.ispublish} disabled/>
                    </td>
                    <td>
                        <div style={{ width: "110px" }}>
                            <CButton color="warning" 
                                onClick={() => history.push(`/product/product/add/${item.id}`)} >
                             Edit
                            </CButton>
                            {' '}
                            <CButton color="danger" 
                                onClick={() => handleDeleteProduct(item.id,item.name)}>
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
                    <th scope="col">Product</th>
                    <th scope="col">Info</th>
                    <th scope="col">Price</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Images</th>
                    <th scope="col">Date</th>
                    <th scope="col">Ispublish</th>
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

export default ProductTable
