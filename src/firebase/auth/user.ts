import { UserContext } from "@/context/UserContext";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const auth = getAuth();
export const createUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const useUser = () => {
  const router = useRouter();

  const [, UserDispatch] = useContext<any>(UserContext);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("sports");
        UserDispatch({ type: "LOGOUT" });
        router.replace("/");
      })
      .catch((error) => {
        toast.error(`An error has occurred: ${error.message}`, {
          autoClose: 2000,
        });
      });
  };

  return { handleSignOut };
};
