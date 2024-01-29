import moment from "moment-timezone";

class ConvertDates {

    /**
     * Formate une date en fonction du fuseau horaire de l'utilisateur.
     * Affiche la date au format "DD/MM/YYYY HH:mm (Fuseau horaire)"
     * Exemple : 01/01/2021 00:00 (Paris)
     *
     * @param date
     */
    static formatDate(date: Date) {
        return new Date(date).toLocaleString();
    }
}

export default ConvertDates;