import { authConfig } from '../auth/auth.config';

describe('Auth Configuration', () => {
 test('Should have required providers and callbacks', () => {
   expect(authConfig.providers).toHaveLength(1);
   expect(authConfig.callbacks).toBeDefined();
   expect(authConfig.pages?.signIn).toBe('/');  
 });
});