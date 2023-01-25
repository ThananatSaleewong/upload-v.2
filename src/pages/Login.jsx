import LoginHeader from "../components/login/LoginHeader";
import LoginLayout from "../components/login/LoginLayout";
import LoginInput from "../components/login/LoginInput";
import pb from "../lib/pocketbase";
import { useState } from "react";
import Dashboard from "./Dashboard";
function Login() {
  const isLoggedIn = pb.authStore.isValid;
  const [isLoading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(data) {
    setLoading(true);
    console.log(email, password);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  }

  function logout() {
    pb.authStore.clear();
    setDummy(Math.random);
  }
  if (isLoggedIn)
    return (
      <Dashboard logout={logout} />
      // <>
      //   <h1>Logged In:{pb.authStore.model.email}</h1>
      //   <button onClick={logout} className="border p-4 bg-slate-100">
      //     Logout
      //   </button>
      // </>
    );

  return (
    <LoginLayout>
      {isLoading && <p className="text-md font-semibold">Loading....</p>}
      {/* <h1>Logged In:{pb.authStore.isValid.toString()}</h1> */}
      {isLoggedIn ? "True" : "False"}
      <LoginHeader />
      <LoginInput
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        login={login}
        isLoading={isLoading}
      />
    </LoginLayout>
  );
}

export default Login;
