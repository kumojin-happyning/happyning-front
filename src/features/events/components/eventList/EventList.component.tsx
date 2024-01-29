import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React from "react";
import EventModel from "../../models/Event.model";
import ConvertDates from "../../utils/ConvertDates";
import moment from "moment-timezone";

interface EventListProps {
    value: EventModel[];
    header: React.ReactNode;
}

/**
 * Ce composant affiche une liste d'évènements.
 *
 */
const EventList = (props: EventListProps) => {

    return (
        <DataTable
            value={props.value}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="p-datatable-striped"
            tableStyle={{
                minWidth: "50rem",
                maxWidth: "90rem",
                margin: "auto",
                marginTop: "2rem",
            }}
            header={
                props.header
            }
        >
            <Column field="name" header="Name"/>
            <Column field="description" header="Description"/>
            <Column
                field="start"
                header={"Début (" + moment.tz.guess().split("/")[1] +")"}
                body={(event: EventModel) => {
                    return ConvertDates.formatDate(event.start)
                }}
            />
            <Column
                field="end"
                header={"Fin (" + moment.tz.guess().split("/")[1] +")"}
                body={(event: EventModel) => {
                    return ConvertDates.formatDate(event.end)
                }}
            />
        </DataTable>
    );
}

export default EventList;