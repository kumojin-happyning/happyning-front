import {Button} from "primereact/button";
import React from "react";

interface EventCreateFooterProps {
    onSubmit: () => void;
    onCancel: () => void;
    isSubmitDisabled: boolean;
}

export function EventCreateFooter(props: EventCreateFooterProps) {
    return (
        <>
            <Button
                label="Créer"
                onClick={props.onSubmit}
                className="p-button-success"
                disabled={props.isSubmitDisabled}
            />
            <Button
                label="Annuler"
                onClick={props.onCancel}
                className="p-button-danger"
            />
        </>
    );
}