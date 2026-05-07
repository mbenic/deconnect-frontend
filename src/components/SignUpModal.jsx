import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";



function SignUpModal({ onClose }) {
  const { setUser, setToken, login } = useContext(AuthContext);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    fullname: "",
    // first_name: "",
    // last_name: "",
    email: "",
    password: "",
    // confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // Safely split full name
    //const [firstName = "", lastName = ""] = form.fullname.trim().split(" ");

    const [firstName, ...rest] = form.fullname.trim().split(" ");
    const lastName = rest.join(" ");

    const res = await fetch(`${API_URL}/devs/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: form.name,
        first_name: firstName,
        last_name: lastName,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);

      const errorMessage =
        data?.error
          ? Object.values(data.error)[0][0]
          : data?.message || "Registration failed";

      throw new Error(errorMessage);
    }

    // ✅ Auto-login
    login(
      {
        username: data.username,
        user_id: data.user_id,
      },
      data.token
    );

    // Optional (if login() doesn't already handle this)
    // localStorage.setItem("token", data.token);

    navigate("/");
    onClose();

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
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
    aria-label="Create an account"
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
      Create an account
    </h2>
    <p
      className="mt-1.5 text-[14px] text-muted-foreground"
     
    >
      Join the DevConnect community in seconds.
    </p>
    <form  onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
        <label
          className="mb-1.5 block text-[14px] font-medium text-foreground"
         
        >
         Username <span className="text-primary">*</span>
        </label>
        <input
          required=""
          name="name"
          placeholder="Username"
          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors"
          type="text"
          defaultValue=""
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          className="mb-1.5 block text-[14px] font-medium text-foreground"
          
        >
          Full name <span className="text-primary">*</span>
        </label>
        <input
          name="fullname"
          required=""
          placeholder="Sam Taylor"
          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors"
          type="text"
          defaultValue=""
          value={form.fullname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          className="mb-1.5 block text-[14px] font-medium text-foreground"
         
        >
          Email <span className="text-primary">*</span>
        </label>
        <input
          name="email"
          required=""
          placeholder="you@example.com"
          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors"
          type="email"
          defaultValue=""
          value={form.email}
          onChange={handleChange}
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
            name="password"
            required=""
            placeholder="At least 6 characters"
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 pr-12 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors"
            type="password"
            defaultValue=""
            value={form.password}
            onChange={handleChange}
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
        <p
          className="mt-1.5 text-[13px] text-muted-foreground"
         
        >
          Must be at least 6 characters
        </p>
      </div>
      <button
        type="submit"
      
        className="mt-1 w-full rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
     
      
      >
        Create account
      </button>
    </form>
    <p className="mt-6 text-center text-[14px] text-muted-foreground">
      <span >
        Already have an account?
      </span>{" "}
      <button
        type="button"
        className="font-semibold text-primary hover:underline"
        
      
      >
        Log in
      </button>
    </p>
  </div>
</div>
    )
}

export default SignUpModal