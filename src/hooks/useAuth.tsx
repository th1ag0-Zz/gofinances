import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );

        const userInfo = await response.json();
        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        };
        setUser(userLogged);

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged),
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          name: credential.fullName!.givenName!,
          email: credential.email!,
          photo: undefined,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged),
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const data = await AsyncStorage.getItem('@gofinances:user');
      const parsedData = data ? (JSON.parse(data) as User) : ({} as User);

      setUser(parsedData);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
