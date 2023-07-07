import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { UserInterface } from "../interfaces/UserInterface";
import ClientService from "../services/client";
import { useRouter } from "next/router";

interface IAuthContext {
  setUser: (user: UserInterface) => void;
  fetchUser: () => void;
  user: UserInterface | null;
}

interface AuthContextProps {
  children?: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  setUser: () => null,
  fetchUser: () => null,
  user: null,
});

const AuthProvider = ({ children }: AuthContextProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await ClientService.getUser();
        // console.log(response);
        if (typeof response !== "string") {
          setUser(response);
          resolve(response);
        } else {
          reject(new Error(response));
        }
      } catch (err) {
        reject(err);
      }
    });
  };
  useEffect(() => {
    const protectRoute = async () => {
      // check if it is an auth route
      const isAuthRoute = router.pathname.split("/")[1] === "auth";
      const isHomePage = router.pathname === "/" || router.pathname === ""
      if (!isAuthRoute && !isHomePage && !user) {
        try {
          await fetchUser();
        } catch (err) {
          router.replace("/auth/login?ref=" + router.pathname);
        }
      }
    };
    protectRoute();
  }, [router.pathname]);

  const context: IAuthContext = {
    setUser,
    user,
    fetchUser,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthProvider;
