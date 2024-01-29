import React, {useRef} from 'react';
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
import ConvertDates from "../../utils/ConvertDates";
import {Toast} from "primereact/toast";
import {utc} from "moment";

interface NewEventFormProps {
    events: EventModel[];
    isDialogVisible: boolean;
    setDialogVisible: (visible: boolean) => void;
}

const NewEventDialog = (props: NewEventFormProps) => {

    const {events, setDialogVisible, isDialogVisible} = props;
    const [timezones, setTimezones] = React.useState<string[]>(moment.tz.names());
    const [newEvent, setNewEvent] = React.useState<EventModel>({} as EventModel);

    const toast = useRef<Toast>(null);

    const submit = async () => {
        try {
            await EventService.createEvent(newEvent)
            events.push(newEvent)
            showSuccess('Évènement créé avec succès')
        } catch (e) {
            console.error(e)
            showError('Erreur lors de la création de l\'évènement')
        } finally {
            setDialogVisible(false)
            setNewEvent({} as EventModel)
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

    const showSuccess = (message: string) => {
        toast.current?.show({severity: 'success', summary: 'Success', detail: message, life: 3000});
    }

    const showError = (message: string) => {
        toast.current?.show({severity: 'error', summary: 'Error', detail: message, life: 3000});
    }

    return (
        <>
            <Toast ref={toast}/>
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
                            value={newEvent.start || null}
                            onChange={(e) => {
                                setNewEvent(
                                    {
                                        ...newEvent,
                                        start: new Date(e.value!.toString())
                                    }
                                )
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
                            minDate={newEvent.start || new Date()}
                            showIcon
                            value={newEvent.end || null}
                            onChange={(e) => {
                                setNewEvent({
                                    ...newEvent,
                                    end: new Date(e.value!.toString())
                                })
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
                </div>
            </Dialog>
        </>
    );
};

export default NewEventDialog;
