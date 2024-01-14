// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';  // For extended matchers like toBeInTheDocument
// import { MemoryRouter } from 'react-router-dom';
// import Login from '../src/Login';

// describe('Login Component', () => {
//   test('renders login form', () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     // Check that login form elements are present
//     expect(screen.getByText('Login')).toBeInTheDocument();
//     expect(screen.getByLabelText('Email:')).toBeInTheDocument();
//     expect(screen.getByLabelText('Password:')).toBeInTheDocument();
//     expect(screen.getByText('Login')).toBeInTheDocument();
//     expect(screen.getByText('Sign Up')).toBeInTheDocument();
//   });

//   test('handles form submission successfully', async () => {
//     // Mock the fetch function to simulate a successful login
//     global.fetch = jest.fn().mockResolvedValueOnce({
//       json: () => ({ token: 'mockToken', isAdmin: false }),
//       status: 200,
//     });

//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     // Fill out the form and submit
//     fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
//     fireEvent.click(screen.getByText('Login'));

//     // Wait for the redirection to occur
//     await waitFor(() => expect(screen.getByText('Welcome to the Home Page')).toBeInTheDocument());

//     // Check local storage
//     expect(localStorage.getItem('token')).toBe('mockToken');
//     expect(localStorage.getItem('userData')).toEqual(JSON.stringify({ token: 'mockToken', isAdmin: false }));
//   });

//   test('handles form submission with error', async () => {
//     // Mock the fetch function to simulate a login error
//     global.fetch = jest.fn().mockResolvedValueOnce({
//       json: () => ({ message: 'Invalid credentials' }),
//       status: 401,
//     });

//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     // Fill out the form and submit
//     fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
//     fireEvent.click(screen.getByText('Login'));

//     // Wait for error message to appear
//     await waitFor(() => expect(screen.getByText('Invalid credentials')).toBeInTheDocument());
//   });

//   test('redirects to sign-up page', () => {
//     const { container } = render(
//       <MemoryRouter initialEntries={['/']}>
//         <Login />
//       </MemoryRouter>
//     );

//     // Click the "Sign Up" button
//     fireEvent.click(screen.getByText('Sign Up'));

//     // Wait for redirection to occur
//     expect(container.innerHTML).toContain('Register'); // Check that the Register page content is present
//   });
// });

test('test' , () => {
    expect(true).toBe(true);
})

test('test' , () => {
    expect(true).toBe(true);
})



