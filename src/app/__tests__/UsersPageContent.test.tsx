import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import UsersPageContent from '../users/UsersPageContent';

describe('UsersPageContent', () => {
  test('Should render users and handle email toggle', async () => {
    render(
      <Provider store={store}>
        <UsersPageContent />
      </Provider>
    );

    expect(screen.getByText('Users List')).toBeInTheDocument();
    
    const toggleButton = await screen.findByText('Show Email');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Hide Email')).toBeInTheDocument();
  });
});