import React from "react";
import { Formik } from "formik";
import * as Yup from "yup"; // used when validating with a pre-built solution
import AuthService from "../services/auth.service";

const Register = () => (
  <Formik
    initialValues={{ username: "", password: "", email:"" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        AuthService.register(values.username, values.email, values.password).then(
          () => {
            window.location.replace("/login");
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
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
      email: Yup.string()
        .email() 
        .required("Required")
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

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />

          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
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
            Sign Up
          </button>

        </form>
      );
    }}
  </Formik>
);

//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.register(username, email, password).then(
//         (response) => {
//           setMessage(response.data.message);
//           setSuccessful(true);
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           setMessage(resMessage);
//           setSuccessful(false);
//         }
//       );
//     }
//   };

//   return (
//     <div className="col-md-12">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />

//         <Form onSubmit={handleRegister} ref={form}>
//           {!successful && (
//             <div>
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="username"
//                   value={username}
//                   onChange={onChangeUsername}
//                   validations={[required, vusername]}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="email"
//                   value={email}
//                   onChange={onChangeEmail}
//                   validations={[required, validEmail]}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <Input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={password}
//                   onChange={onChangePassword}
//                   validations={[required, vpassword]}
//                 />
//               </div>

//               <div className="form-group">
//                 <button className="btn btn-primary btn-block">Sign Up</button>
//               </div>
//             </div>
//           )}

//           {message && (
//             <div className="form-group">
//               <div
//                 className={ successful ? "alert alert-success" : "alert alert-danger" }
//                 role="alert"
//               >
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };

export default Register;