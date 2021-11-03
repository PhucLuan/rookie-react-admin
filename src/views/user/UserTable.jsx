import React from 'react';
import ReactTable from 'src/reusable/ReactTable';

const UserTable = ({ listitem, onEditMode, handlerefreshDeleteItem }) => {

    const columns = [
        {
            Header: 'Category List',
            columns: [
                {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'Email',
                    accessor: 'email',
                },
                {
                    Header: 'Gender',
                    accessor: 'gender',
                },
                {
                    Header: 'Phone',
                    accessor: 'contact',
                },
                {
                    Header: 'Address',
                    accessor: 'address',
                }
            ],
        }];


    return (
        <>
            <ReactTable columns={columns} data={listitem} ></ReactTable>
        </>
    )
}

export default UserTable
