import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../../hooks/hooks";
import { addAlert, removeAlert } from "../../store/slices/AlertSlice";

const Register = () => {
  const dispatch = useAppDispatch();

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      const id: string = uuid();
      dispatch(
        addAlert({ msg: "Passwords do not match", alertType: "danger", id })
      );
      setTimeout(() => dispatch(removeAlert(id)), 5000);
      console.log("Passwords do not match.");
    } else {
      console.log("SUCCESS!");
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
            type="password"
            value={password2}
            onChange={(e) => onChange(e)}
            placeholder="Confirm Password"
            name="password2"
            minLength={6}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </>
  );
};

export default Register;
