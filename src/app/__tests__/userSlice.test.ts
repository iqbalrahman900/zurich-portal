import { store } from '../store/store';
import { fetchUsers, toggleEmailVisibility } from '../store/features/userSlice';

describe('User Slice', () => {
  test('Should fetch users', async () => {
    await store.dispatch(fetchUsers());
    const state = store.getState().user;
    expect(state.users.length).toBeGreaterThan(0);
    expect(state.loading).toBe(false);
  });

  test('Should toggle email visibility', () => {
    const userId = 1;
    store.dispatch(toggleEmailVisibility(userId));
    const user = store.getState().user.users.find(u => u.id === userId);
    expect(user?.isEmailVisible).toBe(true);
  });
});