import React from 'react';
import useEvents from "../hooks/useEvents.hook";
import {EventList, EventListSkeleton} from "../components";
import {Button} from "primereact/button";
import NewEventDialog from "../components/eventForm/NewEventForm.component";
import logo from "../../../assets/happyning.png"


const EventsPage = () => {

    const {events, isLoading} = useEvents();
    const [isDialogVisible, setDialogVisible] = React.useState<boolean>(false);

    return (
        <>
            <img
                src={logo}
                alt="logo"
                style={{
                    width: "50%",
                    margin: "auto",
                    display: "block"
                }}
            />
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
                        header={
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <h1>Liste des évènements</h1>
                                <Button
                                    label="Créer un évènement"
                                    icon="pi pi-plus"
                                    onClick={() => setDialogVisible(true)}
                                    className="p-button-success"
                                />
                            </div>
                        }
                    />
                )
            }
            <div style={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
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