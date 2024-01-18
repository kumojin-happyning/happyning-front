import {Button} from "primereact/button";
import React from "react";

interface EventCreateFooterProps {
    onSubmit: () => void;
    onCancel: () => void;
}

export function EventCreateFooter(props: EventCreateFooterProps) {
    return (
        <>
            <Button
                label="Créer"
                onClick={props.onSubmit}
                className="p-button-success"
            />
            <Button
                label="Annuler"
                onClick={props.onCancel}
                className="p-button-danger"
            />
        </>
    );
}