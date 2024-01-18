import EventModel from "../models/Event.model";
import * as Process from "process";

class EventRepository {
    private _url: string = process.env.NODE_ENV === "production"
        ? "/api/events"
        : 'http://localhost:8080/api/events';

    set url(url: string) {
        this._url = url;
    }

    get url(): string {
        return this._url;
    }

    /**
     * Récupère la liste des événements
     */
    async findAll(): Promise<EventModel[]> {
        const response = await fetch(this.url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    /**
     * Créer un évènement
     * @param event
     */
    async create(event: EventModel): Promise<EventModel> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(event)
        });

        if (!response.ok) {
            throw new Error("Impossible de créer l'évènement. Vérifiez les informations saisies.");
        }

        return await response.json();
    }
}

const eventRepository = new EventRepository();

export default eventRepository;