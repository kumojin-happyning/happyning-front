import React from 'react';
import {render, fireEvent, waitFor, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewEventDialog from './NewEventForm.component';
import EventService from '../../services/Event.service';
import EventModel from "../../models/Event.model";

jest.mock('../../services/Event.service');

describe('NewEventForm', () => {
    let mockSetDialogVisible: jest.Mock

    jest.mock('../../services/Event.service');

    beforeEach(() => {
        mockSetDialogVisible = jest.fn();
    });

    it('renders without crashing', () => {
        render(<NewEventDialog events={[]} isDialogVisible={true} setDialogVisible={mockSetDialogVisible} />);
    });

    it('does not submits the form without data', async () => {

        const { getByText } = render(<NewEventDialog events={[]} isDialogVisible={true} setDialogVisible={mockSetDialogVisible} />);

        fireEvent.click(getByText('Créer'));

        await waitFor(() => expect(EventService.createEvent).not.toHaveBeenCalled());
    });

    it('submits the form with data', async () => {

        const { getByText, getByLabelText } = render(<NewEventDialog events={[]} isDialogVisible={true} setDialogVisible={mockSetDialogVisible} />);

        fireEvent.change(getByLabelText('Titre *'), { target: { value: 'test' } });
        fireEvent.change(getByLabelText('Description'), { target: { value: 'test' } });

        fireEvent.click(getByText('Créer'));

        await waitFor(() => expect(EventService.createEvent).toHaveBeenCalled());
    });

});