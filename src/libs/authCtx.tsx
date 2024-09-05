import { createContext, useState } from "react";
import { SignInResponse, SignInResponseWithToken, User } from "~/libs/types";
import { bakeLocalStorage, readLocalStorage } from "~/libs/util";

export type Auth = Partial<{
  user: User | null;
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

  const handleUser = (data: SignInResponseWithToken) => {
    bakeLocalStorage("authorization", data.token);
    bakeLocalStorage("user", data.results[0]);
    setUser(data.results[0]);
  };

  return (
    <AuthContext.Provider value={{ user, handleUser, isSignedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
