import {DataTable, DataTableValue} from "primereact/datatable";
import {Column} from "primereact/column";
import {Skeleton} from "primereact/skeleton";
import React from "react";

/**
 * Ce composant affiche un tableau en cours de chargement.
 */
const EventListSkeleton = () => {
    const items: DataTableValue[] = Array.from({length: 10});
    return <DataTable value={items} className="p-datatable-striped">
        <Column field="code" header="Code" style={{width: "25%"}} body={<Skeleton/>}></Column>
        <Column field="name" header="Name" style={{width: "25%"}} body={<Skeleton/>}></Column>
        <Column field="category" header="Category" style={{width: "25%"}} body={<Skeleton/>}></Column>
        <Column field="quantity" header="Quantity" style={{width: "25%"}} body={<Skeleton/>}></Column>
    </DataTable>;
}

export default EventListSkeleton;