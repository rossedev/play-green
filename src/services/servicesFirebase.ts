import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Verify type of get props
export const createUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};
