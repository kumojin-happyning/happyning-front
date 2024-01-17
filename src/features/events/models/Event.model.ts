export default interface EventModel {
    id: number;
    title: string;
    description: string;
    start: Date;
    end: Date;
    timeZone: string;
}