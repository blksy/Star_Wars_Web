import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";
import { supabase } from "../database/supabase";
import { getUserById } from "../api/userRequests";
import { User } from "../interfaces/interfaces";

interface UserContextType {
  user: User | null;
  logIn: (username: string, password: string) => Promise<boolean>;
  logOut: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session", error);
        return;
      }

      if (data?.session?.user) {
        const authUser = data.session.user;
        console.log("authUser", authUser);
        console.log("authUser.id type:", typeof authUser.id);
        try {
          const userData = await getUserById(authUser.id);
          if (userData) {
            setUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              username: userData.username,
            });
          }
        } catch (err) {
          console.error("Error fetching user data", err);
        }
      }
    };
    getSession();
  }, []);

  const logIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in", error);
      return false;
    }

    if (data?.user) {
      const authUser = data.user;

      try {
        const userData = await getUserById(authUser.id);
        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            username: userData.username,
          });
          navigate(ROUTES.home);
          return true;
        }
      } catch (err) {
        console.error("Error fetching user data", err);
        return false;
      }
    }

    return false;
  };

  const logOut = () => {
    supabase.auth.signOut();
    setUser(null);
    navigate(ROUTES.login);
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("Not wrapped in provider");
  }
  return ctx;
};
