import { createContext, useState } from "react";
import { SignInResponse, SignInResponseWithToken } from "~/libs/types";
import { bakeLocalStorage, getCookie, readLocalStorage } from "~/libs/util";

export type Auth = Partial<{
  user: SignInResponse | null;
  handleUser: (data: SignInResponseWithToken) => void;
  isSignedIn: boolean;
}>;

export const AuthContext = createContext<Auth>({});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SignInResponse | null>(
    readLocalStorage("user") ?? null
  );
  const isSignedIn = !!getCookie("Authorization");

  const handleUser = (data: SignInResponseWithToken) => {
    bakeLocalStorage("authorization", data.token);
    bakeLocalStorage("user", data.results[0]);
    setUser(data.results[0]);
  };

  return (
    <AuthContext.Provider value={{ user, handleUser, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
