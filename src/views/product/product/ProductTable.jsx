import { CButton } from '@coreui/react'
import React from 'react'
import { useHistory } from 'react-router';
import productApi from 'src/api/productApi';
import { ParseDateTime } from 'src/Helper/ParseDateTime';
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
                        <img width="100px" src={item.imagePath} alt={item.name} />
                    </td>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        {item.code}
                    </td>
                    <td>
                        {item.finalPrice}

                    </td>
                    <td>{item.productStock}</td>
                    <td>
                        <input type="checkbox" checked={item.ispublish} disabled />
                    </td>
                    <td>
                        <div style={{ width: "110px" }}>
                            <CButton color="warning"
                                onClick={() => history.push(`/product/product/${item.id}`)} >
                                Edit
                            </CButton>
                            {' '}
                            <CButton color="danger"
                                onClick={() => handleDeleteProduct(item.id, item.name)}>
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
                    <th scope="col">Pricture</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock quantity</th>
                    <th scope="col">Published</th>
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
