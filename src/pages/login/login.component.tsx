import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/providers/auth/auth.provider";
import { logInUser } from "@/services/auth/auth.services";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginComponent = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const {
    setLogin,
    setUserToken,
    setUserObject,
    setUserExpiration,
    setUserAuth,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    logInUser({ email: userName, password: password }).then((resp) => {
      const { token, email, userId, name } = resp;
      const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

      setUserToken(token);
      setLogin(true);
      setUserObject({ token, email, userId, name });
      setUserExpiration(Number(expires));
      setUserAuth(resp, Number(expires));
      navigate("/");
    });
    setUserName("");
    setPassword("");
  };

  useEffect(() => {
    if (!userName || !password) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [userName, password]);

  return (
    <div className="flex justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label>User</label>
            <Input
              type="text"
              id="userName"
              value={userName}
              onChange={(e: SyntheticEvent) => {
                const target = e.target as HTMLInputElement;
                setUserName(target.value);
              }}
              placeholder="ex: user@test.com"
              required
            />
          </div>
          <div className="mt-2">
            <label>Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e: SyntheticEvent) => {
                const target = e.target as HTMLInputElement;
                setPassword(target.value);
              }}
              placeholder="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="button"
            disabled={isDisabled}
            onClick={() => handleLogin()}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
