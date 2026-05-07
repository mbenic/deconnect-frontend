import { useState, useContext } from "react"; // ✅ added useContext
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // ✅ fixed
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "hover:text-indigo-600";

  // ✅ define handleLogout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

const [showLoginModal, setShowLoginModal] = useState(false);

  return (
   <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
  <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 md:px-10">
    <div className="flex items-center gap-10">
      <a
        className="flex items-center gap-2"
        aria-label="DevConnect home"
        href="/"
        
      >
        <svg
          width={36}
          height={36}
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
        >
          <circle cx={18} cy={18} r={17} stroke="#14A800" strokeWidth={2} />
          <path
            d="M11 22 C 11 14, 19 14, 19 22 C 19 26, 25 26, 25 22 L 25 13"
            stroke="#14A800"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <span
          className="font-heading text-[22px] font-bold tracking-tight text-foreground"
          
        >
          devconnect
        </span>
      </a>
      <nav className="hidden md:flex items-center gap-7">
        <a
         
          className="text-[15px] font-medium transition-colors hover:text-primary text-foreground"
          href="/devs"
         
        >
          Devs
        </a>
        <a
          
          className="text-[15px] font-medium transition-colors hover:text-primary text-foreground"
          href="/projects"
         
        >
          Projects
        </a>
        <a
         
          className="text-[15px] font-medium transition-colors hover:text-primary text-primary"
          href="/join-as-dev"
         
          aria-current="page"
        >
          Join as Dev
        </a>
        <a
         
          className="text-[15px] font-medium transition-colors hover:text-primary text-foreground"
          href="/submit-project"
        
        >
          Submit project
        </a>
        {/* <a
         
          className="text-[15px] font-medium transition-colors hover:text-primary text-foreground"
          href="/pricing"
          
        >
          Pricing
        </a> */}


      </nav>
    </div>

    {!user && (
    <div className="hidden md:flex items-center gap-5">
      <button
        className="text-[15px] font-medium text-foreground transition-colors hover:text-primary"
        data-text-id="nav.login"
        onClick={() => setShowLoginModal(true)}
      >
        Log in
      </button>
      <a
        className="rounded-full bg-primary px-5 py-2.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary-dark active:scale-[0.98]"
        data-text-id="nav.postProject"
        href="/submit-project"
        data-discover="true"
      >
        Post a project
      </a>
    </div>  )}
      {user && (
    <div className="hidden md:flex items-center gap-5">
      <span className="text-[15px] font-medium text-foreground">Hi, {user.username}</span>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 "
      >
        Logout
      </button>
    </div>  )}

    <button className="md:hidden text-foreground" aria-label="Toggle menu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={26}
        height={26}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu"
        aria-hidden="true"
      >
        <path d="M4 5h16" />
        <path d="M4 12h16" />
        <path d="M4 19h16" />
      </svg>
    </button>
  </div>
    
    {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
</header>
 );
}