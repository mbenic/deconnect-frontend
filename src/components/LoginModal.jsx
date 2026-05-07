import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config.js';

function LoginModal({ onClose }) {

 const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("API_URL:", API_URL); 
    
    const res = await fetch(`${API_URL}/devs/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      // Save user & token in context
      //login(data.username, data.token); // <--- important

      login({
          username: data.username,
          user_id: data.user_id,
        }, data.token);

      navigate("/");
    } else {
      alert("Login failed");
    }
    setLoading(false);
    onClose(); // Close the modal after login attempt
  };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
  <div
    className="absolute inset-0 bg-foreground/40"
    aria-hidden="true"
    style={{ opacity: 1 }}
  />
  <div
    className="relative w-full max-w-[440px] rounded-[24px] border border-border bg-background p-8 md:p-10 shadow-xl"
    role="dialog"
    aria-modal="true"
    aria-label="Welcome back"
    style={{ opacity: 1, transform: "none" }}
  >
    <button
      className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Close"
     
      onClick={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-x"
        aria-hidden="true"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
    <h2
      className="font-heading text-[28px] font-semibold tracking-tight text-foreground"
       
    >
      Welcome back
    </h2>
    <p
      className="mt-1.5 text-[14px] text-muted-foreground"
      
    >
      Log in to your DevConnect account.
    </p>
    <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          className="mb-1.5 block text-[14px] font-medium text-foreground"
           
        >
          Username <span className="text-primary">*</span>
        </label>
        <input
          required=""
          placeholder="Username"
          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors"
          type="text"
          defaultValue=""
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <div>
        <label
          className="mb-1.5 block text-[14px] font-medium text-foreground"
           
        >
          Password <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <input
            required=""
            placeholder="Your password"
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 pr-12 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors"
            type="password"
            defaultValue=""
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Show password"
          
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={17}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye"
              aria-hidden="true"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx={12} cy={12} r={3} />
            </svg>
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="mt-1 w-full rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
         
    
      >
        Log in
      </button>
    </form>
    <p className="mt-6 text-center text-[14px] text-muted-foreground">
      <span data-text-id="auth.login.switch.prompt">
        Don't have an account?
      </span>{" "}
      <button
        type="button"
        className="font-semibold text-primary hover:underline"
       
       
      >
        Create one
      </button>
    </p>
  </div>
</div>

    )
}

export default LoginModal;