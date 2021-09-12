import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';
import 'jest-fetch-mock';

import { AuthProvider, useAuth } from '../../hooks/useAuth';

const Providers: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

jest.mock('expo-auth-session');
fetchMock.enableMocks();

describe('Auth Hook', () => {
  it('should be able to signIn with Google account', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 'any_id',
        email: 'thiago.silva@gmail.com',
        name: 'Thiago',
        photo: 'any_photo.png',
      }),
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: Providers,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('thiago.silva@gmail.com');
  });
});
