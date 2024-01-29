import React, {useRef} from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import moment from "moment-timezone";
import EventModel from "../../models/Event.model";
import {Dialog} from "primereact/dialog";
import EventService from "../../services/Event.service";
import "./newEvent.style.css"
import {EventCreateFooter} from "./eventCreateFooter/EventCreateFooter.component";
import {Toast} from "primereact/toast";
import DEFAULT_EVENT from "../../constants/DEFAULT_EVENT";

interface NewEventFormProps {
    events: EventModel[];
    isDialogVisible: boolean;
    setDialogVisible: (visible: boolean) => void;
}

const NewEventDialog = (props: NewEventFormProps) => {

    const {events, setDialogVisible, isDialogVisible} = props;
    const [newEvent, setNewEvent] = React.useState<EventModel>(DEFAULT_EVENT);

    const toast = useRef<Toast>(null);

    const isDisabled = () => {
        return !newEvent.name
            || !newEvent.start
            || !newEvent.end
            || !newEvent.description
            || newEvent.name.length > 33
            || newEvent.description.length > 255
            || newEvent.start > newEvent.end
    }

    const submit = async () => {
        try {
            await EventService.createEvent(newEvent)
            events.push(newEvent)
            showSuccess('Évènement créé avec succès')
        } catch (e) {
            console.error(e)
            showError('Une erreur est survenue lors de la création de l\'évènement')
        } finally {
            setDialogVisible(false)
            setNewEvent(DEFAULT_EVENT)
        }
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
                            setNewEvent(DEFAULT_EVENT)
                            setDialogVisible(false)
                        }}
                        isSubmitDisabled={isDisabled()}
                    />
                }
            >
                <div className="form-container">
                    <div className="form-input">
                        <label htmlFor="name">Titre *</label>
                        <InputText
                            value={newEvent.name}
                            onChange={handleChange}
                            id="name"
                            className={newEvent.name && newEvent.name.length > 33 ? "p-invalid" : ""}
                        />
                        {newEvent.name.length > 33 &&
                            <small className="p-error">Le titre ne peut pas dépasser 33 caractères</small>
                        }
                    </div>
                    <div>

                        <label htmlFor="description">Description</label>
                        <InputTextarea
                            value={newEvent.description}
                            onChange={handleChange}
                            id="description"
                            rows={5}
                            cols={30}
                            className={newEvent.description && newEvent.description.length > 255 ? "p-invalid" : ""}
                        />
                        {newEvent.description.length > 255 &&
                            <small className="p-error">La description ne peut pas dépasser 255 caractères</small>
                        }
                    </div>
                    <div>
                        <label htmlFor="start">Début *</label>
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
                            className={newEvent.start && newEvent.start > newEvent.end ? "p-invalid" : ""}
                        />
                        {newEvent.start && newEvent.start > newEvent.end &&
                            <small className="p-error">La date de début ne peut pas être après la date de fin</small>
                        }
                    </div>
                    <div>
                        <label htmlFor="end">Fin *</label>
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
                            className={newEvent.end && newEvent.end < newEvent.start ? "p-invalid" : ""}
                        />
                        {newEvent.end && newEvent.end < newEvent.start &&
                            <small className="p-error">La date de fin ne peut pas être avant la date de début</small>
                        }
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default NewEventDialog;
