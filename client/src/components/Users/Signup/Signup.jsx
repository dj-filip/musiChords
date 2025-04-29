import { useState } from "react";
import useSignup from "../../../hooks/useSignup";
import { NavLink } from "react-router-dom";


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();


  const handleSubmitForm = async (e) => {
    e.preventDefault();

    await signup(email, password);
  }


  return (
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
        value="Sign Up"
        className="form-btn"
      />
      <NavLink to='/log-in'>
        Log In
      </NavLink>
      {error && <div>{error}</div>}
    </form>
  )
}

export default Signup;