import React from 'react';
import {DataTable, DataTableValue} from 'primereact/datatable';
import {Column} from 'primereact/column';
import useEvents from "../hooks/useEvents.hook";
import {Skeleton} from 'primereact/skeleton';

const EventsPage = () => {

    const {events, isLoading} = useEvents();
    const items: DataTableValue[] = Array.from({length: 10});

    return (
        <>
            {
                isLoading && (
                    <DataTable value={items} className="p-datatable-striped">
                        <Column field="code" header="Code" style={{width: '25%'}} body={<Skeleton/>}></Column>
                        <Column field="name" header="Name" style={{width: '25%'}} body={<Skeleton/>}></Column>
                        <Column field="category" header="Category" style={{width: '25%'}} body={<Skeleton/>}></Column>
                        <Column field="quantity" header="Quantity" style={{width: '25%'}} body={<Skeleton/>}></Column>
                    </DataTable>
                )
            }
            {
                !isLoading && (
                    <DataTable
                        value={events}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="p-datatable-striped"
                        tableStyle={{minWidth: '50rem'}}
                    >
                        <Column field="name" header="Name"></Column>
                        <Column field="description" header="Description"></Column>
                        <Column field="start" header="Début" ></Column>
                        <Column field="end" header="Fin"></Column>
                    </DataTable>
                )
            }
        </>
    );
};

export default EventsPage;