import React, {useEffect} from 'react';
import useEvents from "../hooks/useEvents.hook";
import {EventList, EventListSkeleton} from "../components";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import EventModel from "../models/Event.model";
import {Calendar} from "primereact/calendar";
import {Card} from "primereact/card";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import moment from "moment-timezone";
import {AutoComplete} from "primereact/autocomplete";
import EventService from "../services/Event.service";
import { Nullable } from "primereact/ts-helpers";


interface EventCreateFooterProps {
    onSubmit: () => void;
    onCancel: () => void;
}
function EventCreateFooter(props: EventCreateFooterProps) {
    return <>
        <Button label="Créer" onClick={props.onSubmit}/>
        <Button label="Annuler" onClick={props.onCancel}/>
    </>;
}

const EventsPage = () => {

    const {events, isLoading} = useEvents();
    const [isDialogVisible, setDialogVisible] = React.useState<boolean>(false);
    const [newEvent, setNewEvent] = React.useState<EventModel>({
        timezone: moment.tz.guess(),
    } as EventModel);

    const [timezones, setTimezones] = React.useState<string[]>(moment.tz.names());

    const [newEventStart, setNewEventStart] = React.useState<Nullable<Date>>(null);
    const [newEventEnd, setNewEventEnd] = React.useState<Nullable<Date>>(null);

    const searchTimezones = (event: { query: string; }) => {
        const results = moment.tz.names().filter((timezone) => {
            return timezone.toLowerCase().includes(event.query.toLowerCase());
        });
        setTimezones(results);
    }

    const submit = async () => {
        try {
            await EventService.createEvent(newEvent)
            events.push(newEvent)
        } catch (e) {
            console.error(e)
        } finally {
            setDialogVisible(false)
            setNewEvent({} as EventModel)
            setNewEventStart(null)
            setNewEventEnd(null)
        }
    }

    return (
        <>
            {
                isLoading && (
                    <EventListSkeleton/>
                )
            }
            {
                !isLoading && (
                    <EventList value={events} test-id="eventList"/>
                )
            }
            <Button onClick={() => setDialogVisible(true)} label="Open" style={{justifySelf: "center"}}/>
            <Dialog
                onHide={() => setDialogVisible(false)}
                visible={isDialogVisible}
                style={{flexDirection: "column", display: "flex"}}
                header="Créer un évènement"
                footer={
                <EventCreateFooter
                    onSubmit={submit}
                    onCancel={() => {
                        setNewEvent({} as EventModel)
                        setDialogVisible(false)
                    }}
                />
            }
            >
                <Card>
                    <label htmlFor="title">Titre</label>
                    <InputText
                        value={newEvent.name}
                        onChange={(e) => {
                            setNewEvent({...newEvent, name: e.target.value})
                        }}
                        id="title"
                    />
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                        value={newEvent.description}
                        onChange={(e) => {
                            setNewEvent({...newEvent, description: e.target.value})
                        }}
                        id="description"
                    />
                    <label htmlFor="start">Début</label>
                    <Calendar
                        value={newEventStart || null}
                        onChange={(e) => {
                            setNewEventStart(e.value)
                            setNewEvent({...newEvent, start: e.value!.toISOString()})
                        }}
                        id="start"
                        showTime
                        hourFormat="24"
                    />

                    <label htmlFor="end">Fin</label>
                    <Calendar
                        value={newEventEnd || null}
                        onChange={(e) => {
                            setNewEventEnd(e.value)
                            setNewEvent({...newEvent, end: e.value!.toISOString()})
                        }}
                        id="end"
                        showTime
                        hourFormat="24"
                        formatDateTime={(e) => {
                            return e.toLocaleString()
                        }}
                    />
                    <label htmlFor="timezone">TimeZone</label>
                    <AutoComplete
                        value={newEvent.timezone}
                        suggestions={timezones}
                        onChange={(e) => {
                            setNewEvent({...newEvent, timezone: e.value})
                        }}
                        id="timezone"
                        dropdown
                        completeMethod={searchTimezones}
                        onEmptied={
                            () => setTimezones(moment.tz.names)
                        }
                    />
                </Card>
            </Dialog>
        </>
    );
};

export default EventsPage;