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
      <NavLink
        className="flex items-center gap-2"
        aria-label="DevConnect home"
        to="/"
        
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
      </NavLink>
      <nav className="hidden md:flex items-center gap-7">
        <NavLink
         
          className="text-[15px] font-medium transition-colors hover:text-primary text-foreground"
          to="/devs"
         
        >
          Devs
        </NavLink>
        <NavLink
         
          className="text-[15px] font-medium transition-colors hover:text-primary text-foreground"
          to="/projects"
         
        >
          Projects
        </NavLink>
        <NavLink
         
          className="text-[15px] font-medium transition-colors hover:text-primary text-primary"
          to="/join-as-dev"
         
          aria-current="page"
        >
          Join as Dev
        </NavLink>
        <NavLink
         
          className="text-[15px] font-medium transition-colors hover:text-primary text-foreground"
          to="/submit-project"
        
        >
          Submit project
        </NavLink>

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
      <NavLink  
        className="rounded-full bg-primary px-5 py-2.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary-dark active:scale-[0.98]"
        data-text-id="nav.postProject"
        to="/submit-project"
        data-discover="true"
      >
        Post a project
      </NavLink>
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

    {/* Mobile Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
  </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <NavLink to="/" className="block" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/devs" className="block" onClick={() => setOpen(false)}>
            Devs
          </NavLink>
           <NavLink to="/projects" className="block" onClick={() => setOpen(false)}>
            Projects
          </NavLink>
           <NavLink to="/join-as-dev" className="block" onClick={() => setOpen(false)}>
            Join as Dev
          </NavLink>
           <NavLink to="/submit-project" className="block" onClick={() => setOpen(false)}>
            Submit Project
          </NavLink>
          {!user && (
            <>
              <NavLink to="/login" className="block" onClick={() => setOpen(false)}>
                Login
              </NavLink>
             
            </>
          )}
          {user && (
            <>
             
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="inline-block bg-red-500 px-3 py-1 rounded text-white text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

  
    
    {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
</header>
 );
}