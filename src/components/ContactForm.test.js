import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    // Arrange
    render(<ContactForm />);

    // Act
    const h1 = screen.queryByText(/contact form/i);

    // Assert
    expect(h1).toBeInTheDocument();
    expect(h1).toBeTruthy();
    expect(h1).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const firstnameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstnameInput, "jer");

    const errors = await screen.findAllByTestId(/error/i);
    
    // // Assert
    expect(errors).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByTestId(/error/i);
    
    // // Assert
    expect(errors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const firstnameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstnameInput, "jeremiah");
    
    const lastnameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastnameInput, "candelaria");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByTestId(/error/i);
    
    // // Assert
    expect(errors).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "j@g");

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    
    // // Assert
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const lastnameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastnameInput, "");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    
    // // Assert
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    // Arrange
    render(<ContactForm />);
    
    // Act
    const firstnameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstnameInput, "jeremiah");

    const lastnameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastnameInput, "candelaria");

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "email@gmail.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByTestId(/firstnameDisplay/i);
        const lastnameDisplay = screen.queryByTestId(/lastnameDisplay/i);
        const emailDisplay = screen.queryByTestId(/emailDisplay/i);
        const messageDisplay = screen.queryByTestId(/messageDisplay/i);

        // Assert
        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    // Arrange
    render(<ContactForm />);
    
    // Act
    const firstnameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstnameInput, "jeremiah");

    const lastnameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastnameInput, "candelaria");

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "email@gmail.com");

    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, "hi!")

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByTestId(/firstnameDisplay/i);
        const lastnameDisplay = screen.queryByTestId(/lastnameDisplay/i);
        const emailDisplay = screen.queryByTestId(/emailDisplay/i);
        const messageDisplay = screen.queryByTestId(/messageDisplay/i);

        // Assert
        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    });
});

test('renders "firstName must have at least 5 characters" if first name is not at least 5 characters long', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const firstnameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstnameInput, "jer");

    // const button = screen.getByRole("button");
    // userEvent.click(button);

    const errorMessage = await screen.findByText(/firstName must have at least 5 characters/i);
    
    // // Assert
    expect(errorMessage).toBeInTheDocument();
});