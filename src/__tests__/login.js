import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Container from '../components/login'
import { MemoryRouter } from 'react-router-dom'

describe('login screen', () => {
    test('renders the logo', () => {
        const { container, getByAltText } = render(<Container />, { wrapper: MemoryRouter })
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { container, getByTestId } = render(<Container />, { wrapper: MemoryRouter })
        const title = getByTestId('log-in')
        expect(title).toBeVisible()
    })
    test('renders the phone number input', () => {
        const { container, getByPlaceholderText } = render(<Container />, { wrapper: MemoryRouter })
        const phoneNumberField = getByPlaceholderText(/phone number/i)
        expect(phoneNumberField).toBeVisible()
        expect(phoneNumberField).toBeEnabled()
    })
    test('renders the password input', () => {
        const { container, getByPlaceholderText } = render(<Container />, { wrapper: MemoryRouter })
        const passwordField = getByPlaceholderText(/^password$/i)
        expect(passwordField).toBeVisible()
        expect(passwordField).toBeEnabled()
    })
    test('renders the log in button', () => {
        const { container, getByRole } = render(<Container />, { wrapper: MemoryRouter })
        const registerButton = getByRole("button")
        expect(registerButton).toBeVisible()
        expect(registerButton).toBeEnabled()
    })
    test('renders the register link', () => {
        const { container, getByText } = render(<Container />, { wrapper: MemoryRouter })
        const registerLink = getByText(/register/)
        expect(registerLink).toBeVisible()
    })
    test('renders the forgot password link', () => {
        const { container, getByText } = render(<Container />, { wrapper: MemoryRouter })
        const forgotPasswordLink = getByText(/forgot/i)
        expect(forgotPasswordLink).toBeVisible()
    })
})
