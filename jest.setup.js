import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// Increase the timeout for async operations
jest.setTimeout(10000)

// Configure Testing Library
configure({
  testIdAttribute: 'data-testid',
})