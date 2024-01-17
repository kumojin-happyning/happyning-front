import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useEvents from "../hooks/useEvents.hook";

const EventsPage = () => {

    const {events, isLoading, error} = useEvents();

    return (
        <DataTable value={events} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="start" header="Début"></Column>
            <Column field="end" header="Fin"></Column>
        </DataTable>
    );
};

export default EventsPage;