import { createContext, useState } from "react";
import { SignInResponse } from "~/libs/types";
import { getCookie } from "~/libs/util";

export type Auth = Partial<{
  user: SignInResponse | null;
  setUser: React.Dispatch<React.SetStateAction<SignInResponse | null>>;
  isSignedIn: boolean;
}>;

export const AuthContext = createContext<Auth>({});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SignInResponse | null>(null);
  const isSignedIn = !!getCookie("Authorization");

  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
