import { CBadge, CButton } from '@coreui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { ParseDateTime } from 'src/Helper/ParseDateTime';
import ReactTable from 'src/reusable/ReactTable';
import 'src/style/admin.css';

const OrderTable = ({ listitem }) => {

    const history = useHistory();

    function renderSwitch(param) {
        switch(param) {
          case 'Processing':
            return <CBadge color="info">Processing</CBadge>;
          case 'Complete':
            return <CBadge color="success">Complete</CBadge>;
          default: //pending
            return <CBadge color="warning">Pending</CBadge>;
        }
      }
    const columns = [
          {
            Header: 'Order List',
            columns: [
            {
                Header: 'Order ID',
                accessor: 'id',
                },
              {
                Header: 'Email',
                accessor: 'email',
              },
              {
                Header: 'PaymentMethod',
                accessor: 'paymentMethod',
              },
              {
                Header: 'DeliveryAddress',
                accessor: 'deliveryAddress',
              },
              {
                Header: 'OrderStatus',
                accessor: 'orderStatus',
                Cell: ({row}) => (
                    renderSwitch(row.original.orderStatus)
                )
              },
              {
                Header: 'Create date',
                accessor: 'addedDate',
                Cell: ({row}) => (
                  <div>
                    {/* {row.original.addedDate} */}
                  {ParseDateTime(row.original.addedDate)}
                  </div>
              )
              },
              {
                Header: 'Action',
                Cell: ({row}) => (
                    <div>
                        <CButton color="warning" onClick={() => history.push(`/order/${row.original.id}`)}>View</CButton>
                    </div>
                )
              },
            ],
          }];
      //   [history]
      // )

    return (
        <>
            <ReactTable columns={columns} data={listitem} ></ReactTable>
        </>
    )
}

export default OrderTable
