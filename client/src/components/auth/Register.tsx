import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addAlert, removeAlert } from "../../store/slices/AlertSlice";
import { loadUser, registerSuccess } from "../../store/slices/AuthSlice";
import { RootState } from "../../store/store";
import { setAuthToken } from "../../utils/utils";

interface UserType {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(
    (store: RootState) => store.auth.value
  );
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const mutation = useMutation((newUser: UserType) => {
    return axios.post("/api/users", newUser);
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      const id: string = uuid();
      dispatch(
        addAlert({ msg: "Passwords do not match", alertType: "danger", id })
      );
      setTimeout(() => dispatch(removeAlert(id)), 5000);
      console.log("Passwords do not match.");
    } else {
      try {
        const response = await mutation.mutateAsync({ name, email, password });
        dispatch(registerSuccess(response.data));

        setAuthToken(response.data.token);
        const resUser = await axios.get("/api/auth");
        dispatch(loadUser(resUser.data));
      } catch (err: any) {
        const id: string = uuid();
        // console.error(err.response.data.errors);
        err.response.data.errors.forEach((error: any) => {
          dispatch(addAlert({ msg: error.msg, alertType: "danger", id }));
          setTimeout(() => dispatch(removeAlert(id)), 5000);
        });
      }
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        onSubmit={(e) => onSubmit(e)}
        action="create-profile.html"
      >
        <div className="form-group">
          <input
            hidden
            type="text"
            value={name}
            onChange={(e) => onChange(e)}
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <input
            hidden
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            hidden
            type="password"
            value={password2}
            onChange={(e) => onChange(e)}
            placeholder="Confirm Password"
            name="password2"
            minLength={6}
          />
        </div>
        <input
          hidden
          type="submit"
          className="btn btn-primary"
          value="Register"
        />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </>
  );
};

export default Register;
