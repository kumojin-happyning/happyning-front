import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

    it('submits the form', async () => {

        const { getByText } = render(<NewEventDialog events={[]} isDialogVisible={true} setDialogVisible={mockSetDialogVisible} />);

        fireEvent.click(getByText('Créer'));

        await waitFor(() => expect(EventService.createEvent).toHaveBeenCalled());
    });

});