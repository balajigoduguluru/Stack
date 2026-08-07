import { render, screen } from '@testing-library/react'
import Home from '../app/page'

// Mock the auth module since this is a server component
vi.mock('@stack/auth', () => ({
  auth: vi.fn().mockResolvedValue(null)
}))

describe('Home Page', () => {
  it('renders the welcome heading', async () => {
    // Next.js page components are async in App Router
    const Page = await Home()
    render(Page)
    
    expect(screen.getByText('Welcome to Stack 2.0')).toBeInTheDocument()
  })
})
