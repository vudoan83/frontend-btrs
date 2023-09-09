import React from 'react'
import { render, screen } from '@testing-library/react'
import Chat from '../Chat' // Adjust the import path as needed

// Mock localStorage to simulate storage behavior
const localStorageMock = (() => {
  let store: Record<string, string | null> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    clear: () => (store = {}),
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('Chat Component', () => {
  test('renders without error', () => {
    render(<Chat />)
    const headerElement = screen.getByText(/Chat Room/i)
    expect(headerElement).toBeInTheDocument()
  })

  test('renders name input when not entered chat', () => {
    render(<Chat />)
    const nameInput = screen.getByPlaceholderText(/Your Name/i)
    expect(nameInput).toBeInTheDocument()
  })

  test('does not render messages when not entered chat', () => {
    render(<Chat />)
    const messageInput = screen.queryByPlaceholderText(/Message/i)
    expect(messageInput).not.toBeInTheDocument()
  })
})
