import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstnameInput = await screen.queryByLabelText(/first name*/i);
    userEvent.type(firstnameInput, 'jer');
    const errors = await screen.findAllByText(/error/i);
    expect(errors).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const errors = await screen.findAllByText(/error/i);
    expect(errors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstnameInput = await screen.queryByLabelText(/first name*/i);
    userEvent.type(firstnameInput, 'jeremiah');
    const lastnameInput = await screen.queryByLabelText(/last name*/i);
    userEvent.type(lastnameInput, 'candelaria');
    const button = screen.getByRole("button");
    userEvent.click(button);
    const errors = await screen.findAllByText(/error/i);
    expect(errors).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = await screen.getByLabelText(/email*/i);
    userEvent.type(email, 'j@j');
    const errorText = await screen.getByText(/email must be a valid email address/i);
    expect(errorText).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstnameInput = await screen.queryByLabelText(/first name*/i);
    userEvent.type(firstnameInput, 'jeremiah');
    const email = await screen.getByLabelText(/email*/i);
    userEvent.type(email, 'j@j.com');
    const button = screen.getByRole("button");
    userEvent.click(button);
    const errorText = await screen.getByText(/lastName is a required field/i);
    expect(errorText).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstnameInput = await screen.queryByLabelText(/first name*/i);
    userEvent.type(firstnameInput, 'jeremiah');
    const lastnameInput = await screen.queryByLabelText(/last name*/i);
    userEvent.type(lastnameInput, 'candelaria');
    const email = await screen.getByLabelText(/email*/i);
    userEvent.type(email, 'j@j.com');
    expect(() => screen.getByText(/you submitted:/i)).toThrow(/unable to find an element/i);
    const button = await screen.getByRole("button");
    userEvent.click(button);
    const message = await screen.getByText(/you submitted:/i);
    const firstnameDisplay = await screen.getByTestId(/firstnamedisplay/i);
    const lastnameDisplay = await screen.getByTestId(/lastnamedisplay/i);
    const emailDisplay = await screen.getByTestId(/emailDisplay/i);
    expect(message).toBeInTheDocument();
    expect(firstnameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstnameInput = await screen.queryByLabelText(/first name*/i);
    userEvent.type(firstnameInput, 'jeremiah');
    const lastnameInput = await screen.queryByLabelText(/last name*/i);
    userEvent.type(lastnameInput, 'candelaria');
    const email = await screen.getByLabelText(/email*/i);
    userEvent.type(email, 'j@j.com');
    const message = await screen.getByLabelText(/message/i);
    userEvent.type(message, 'YOU DID IT!');
    const button = await screen.getByRole("button");
    userEvent.click(button);
    const firstnameDisplay = await screen.getByTestId(/firstnamedisplay/i);
    const lastnameDisplay = await screen.getByTestId(/lastnamedisplay/i);
    const emailDisplay = await screen.getByTestId(/emailDisplay/i);
    const messageDisplay = await screen.getByTestId(/messageDisplay/i);
    expect(firstnameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
});

// STRETCH
test('renders TWO error messages if user only enters a valid first name and tries to submit.', async () => {
    render(<ContactForm />);
    const firstnameInput = await screen.queryByLabelText(/first name*/i);
    userEvent.type(firstnameInput, 'jeremiah');
    const button = screen.getByRole("button");
    userEvent.click(button);
    const errors = await screen.findAllByText(/error/i);
    expect(errors).toHaveLength(2);
});