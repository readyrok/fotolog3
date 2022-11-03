import React from "react";
import { Formik } from "formik";
import * as Yup from "yup"; // used when validating with a pre-built solution
import AuthService from "../services/auth.service";


const Login = () => (
  <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {

      setTimeout(() => {
        
        AuthService.login(values.username, values.password).then(
          () => {
            window.location.replace("/profile");
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            console.log(resMessage);
          }
        );

        setSubmitting(false);
      }, 500);
    }}

    validationSchema={Yup.object().shape({
      username: Yup.string()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;

      return (
        <form onSubmit={handleSubmit}>

          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username && "error"}
          />

          {errors.username && touched.username && (
            <div className="input-feedback">{errors.username}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />

          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}

          <button type="submit" disabled={isSubmitting}>
            Login
          </button>

        </form>
      );
    }}
  </Formik>
);

export default Login;