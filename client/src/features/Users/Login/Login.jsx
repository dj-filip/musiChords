import { useEffect, useState } from "react";
import useLogin from "../../../hooks/useLogin";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const { user } = useAuthContext();

  const navigate = useNavigate();


  const handleSubmitForm = async (e) => {
    e.preventDefault();

    await login(email, password);
  }


  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);


  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-column add-song-form"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          disabled={isLoading}
          type="submit"
          value="Log In"
          className="form-btn"
        />
        <NavLink to='/sign-up'>
          Sign Up
        </NavLink>
        {error && <div>{error}</div>}
      </form>

    </>
  )
}

export default Login;