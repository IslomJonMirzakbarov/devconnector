import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  loadUser,
  loginFail,
  loginSuccess,
} from "../../store/slices/AuthSlice";
import { RootState } from "../../store/store";
import { setAuthToken } from "../../utils/utils";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(
    (store: RootState) => store.auth.value
  );
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const mutation = useMutation((logUser: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(logUser);

    return axios.post("/api/auth", body, config);
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await mutation.mutateAsync({ email, password });
      dispatch(loginSuccess(response.data));

      setAuthToken(response.data.token);
      const resUser = await axios.get("/api/auth");
      dispatch(loadUser(resUser.data));
    } catch (err: any) {
      dispatch(loginFail());
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            hidden
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            hidden
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            name="password"
            minLength={6}
          />
        </div>
        <input hidden type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <a href="login.html">Sign Up</a>
      </p>
    </>
  );
};

export default Login;
