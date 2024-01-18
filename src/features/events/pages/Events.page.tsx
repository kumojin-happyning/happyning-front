import React from 'react';
import useEvents from "../hooks/useEvents.hook";
import {EventList, EventListSkeleton} from "../components";
import {Button} from "primereact/button";
import NewEventDialog from "../components/eventForm/NewEventForm.component";


const EventsPage = () => {

    const {events, isLoading} = useEvents();
    const [isDialogVisible, setDialogVisible] = React.useState<boolean>(false);

    return (
        <>
            {
                isLoading && (
                    <EventListSkeleton/>
                )
            }
            {
                !isLoading && (
                    <EventList
                        value={events}
                        test-id="eventList"
                    />
                )
            }
            <div style={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <Button
                    onClick={() => setDialogVisible(true)}
                    label="Ajouter"
                    className="p-button-success"
                />
            </div>
            <NewEventDialog
                events={events}
                isDialogVisible={isDialogVisible}
                setDialogVisible={setDialogVisible}
            />
        </>
    );
};

export default EventsPage;