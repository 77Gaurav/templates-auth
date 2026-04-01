export interface AuthErrors {
    email?: string;
    password?: string;
    general?: string;
  }
  
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    // Check for minimum length, e.g., 6 characters for Firebase
    return password.length >= 6;
  };