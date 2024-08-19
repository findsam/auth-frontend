import { createContext } from "react";
import { getCookie } from "./util";

export type Auth = Partial<{
  user: null;
}>;

export const AuthContext = createContext<Auth>({});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("Cookie:", getCookie("Authorization"));
  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
