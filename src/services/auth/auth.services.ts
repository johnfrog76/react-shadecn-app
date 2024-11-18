import { iUser } from "@/providers/auth/auth.utilities";

type iPost = {
  email: string;
  password: string;
};

type iSignUp = {
  name: string;
  password: string;
  email: string;
};

const baseURL = "//localhost:3001/api";
const endpoint = "/users/login";
const signupEndpoint = "/users/signup";

export const logInUser = ({ email, password }: iPost) => {
  return new Promise<iUser>((resolve, reject) => {
    fetch(`${baseURL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((resp) => resp.json())
      .then((jsonData: iUser) => resolve(jsonData))
      .catch((err) => {
        console.log("error: ", err);
        reject(err);
      });
  });
};

export const signUpUser = async ({ name, email, password }: iSignUp) => {
  return new Promise<iUser>((resolve, reject) => {
    fetch(`${baseURL}${signupEndpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((resp) => resp.json())
      .then((jsonData: iUser) => resolve(jsonData))
      .catch((err) => {
        console.log("error: ", err);
        reject(err);
      });
  });
};
