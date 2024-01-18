import React from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {AutoComplete} from "primereact/autocomplete";
import moment from "moment-timezone";
import EventModel from "../../models/Event.model";
import {Dialog} from "primereact/dialog";
import EventService from "../../services/Event.service";
import {Nullable} from "primereact/ts-helpers";
import "./newEvent.style.css"
import {EventCreateFooter} from "./eventCreateFooter/EventCreateFooter.component";

interface NewEventFormProps {
    events: EventModel[];
    isDialogVisible: boolean;
    setDialogVisible: (visible: boolean) => void;
}

const NewEventDialog = (props: NewEventFormProps) => {

    const {events, setDialogVisible, isDialogVisible} = props;
    const [timezones, setTimezones] = React.useState<string[]>(moment.tz.names());
    const [newEventStart, setNewEventStart] = React.useState<Nullable<Date>>(null);
    const [newEventEnd, setNewEventEnd] = React.useState<Nullable<Date>>(null);
    const [newEvent, setNewEvent] = React.useState<EventModel>(
        {
            timezone: moment.tz.guess(),
        } as EventModel);

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

    const searchTimezones = (event: { query: string; }) => {
        const results = moment.tz.names().filter((timezone) => {
            return timezone.toLowerCase().includes(event.query.toLowerCase());
        });
        setTimezones(results);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewEvent({...newEvent, [e.target.id]: e.target.value})
    }

    return (
        <Dialog
            onHide={() => {
                setDialogVisible(false)
            }}
            visible={isDialogVisible}
            style={{width: "50rem"}}
            modal
            header="Créer un évènement"
            footer={
                <EventCreateFooter
                    onSubmit={submit}
                    onCancel={() => {
                        setNewEvent({} as EventModel)
                        setDialogVisible(false)
                        setNewEventEnd(null)
                        setNewEventStart(null)
                    }}
                />
            }
        >
            <div className="form-container">
                <div className="form-input">
                    <label htmlFor="name">Titre</label>
                    <InputText
                        value={newEvent.name}
                        onChange={handleChange}
                        id="name"
                    />
                </div>
                <div>

                    <label htmlFor="description">Description</label>
                    <InputTextarea
                        value={newEvent.description}
                        onChange={handleChange}
                        id="description"
                        rows={5}
                        cols={30}
                    />
                </div>
                <div>

                    <label htmlFor="start">Début</label>
                    <Calendar
                        showIcon
                        value={newEventStart || null}
                        onChange={(e) => {
                            setNewEventStart(e.value)
                            setNewEvent({...newEvent, start: e.value!.toISOString()})
                        }}
                        minDate={new Date()}
                        id="start"
                        showTime
                        hourFormat="24"
                        formatDateTime={(e) => {
                            return e.toLocaleString()
                        }}
                        hideOnDateTimeSelect
                    />
                </div>
                <div>
                    <label htmlFor="end">Fin</label>
                    <Calendar
                        minDate={newEventStart || new Date()}
                        showIcon
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
                        hideOnDateTimeSelect
                    />
                </div>
                <div>
                    <label htmlFor="timezone">Fuseau Horaire</label>
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
                </div>
            </div>
        </Dialog>
    );
};

export default NewEventDialog;
