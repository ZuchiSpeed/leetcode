// Import the `atom` function from Recoil to create global state.
import { atom } from "recoil";

// Define a type for the auth modal state to ensure correct data structure.
type AuthModalState = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword";
};

// Set the default state for the modal (closed, set to "login").
const initialAuthModalState: AuthModalState = {
  isOpen: false,
  type: "login",
};

// Create a Recoil atom to manage the auth modal state globally.
export const authModalState = atom<AuthModalState>({
  key: "authModelState",
  default: initialAuthModalState,
});
