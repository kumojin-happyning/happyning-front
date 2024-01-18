import moment from "moment-timezone";

class ConvertDates {

    /**
     * A partir d'une date UTC et d'un fuseau horaire, retourne la date locale
     * @param date - Date UTC (ex: 2020-12-31T23:00:00.000Z)
     * @param timezone - Fuseau horaire (ex: Europe/Paris)
     */
    static toLocalDate(date: string, timezone: string): string {
        return moment(date).clone().tz(timezone).format('DD-MM-YYYY HH:mm:ss')
    }
}

export default ConvertDates;