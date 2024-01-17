import EventModel from "../models/Event.model";

class EventRepository {
    private _url: string = 'http://localhost/api/events';

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
        const response = await fetch(this.url);
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });
        return await response.json();
    }
}

const eventRepository = new EventRepository();

export default eventRepository;