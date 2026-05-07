export default function Navbar() {

    return (
<footer className="mt-auto border-t border-border bg-background">
  <div className="mx-auto max-w-[1320px] px-5 md:px-10 py-16">
    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <a className="flex items-center gap-2" href="/" data-discover="true">
          <svg
            width="32"
            height="32"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="18"
              cy="18"
              r="17"
              stroke="#14A800"
              strokeWidth="2"
            ></circle>
            <path
              d="M11 22 C 11 14, 19 14, 19 22 C 19 26, 25 26, 25 22 L 25 13"
              stroke="#14A800"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            ></path>
          </svg>
          <span
            className="font-heading text-[22px] font-bold tracking-tight text-foreground"
           
          >
            devconnect
          </span>
        </a>
        <p
          className="mt-4 max-w-[280px] text-[15px] text-muted-foreground"
         
        >
          Where serious founders meet makers who finish.
        </p>
      </div>
      <div>
        <h4
          className="text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground"
         
        >
          Platform
        </h4>
        <ul className="mt-5 space-y-3">
          <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
          
              href="/projects"
        
            >
              Projects
            </a>
          </li>

        <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
          
              href="/devs"
        
            >
              Developers
            </a>
          </li>

          <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
               
              href="/how-it-works"
             
            >
              How it works
            </a>
          </li>
          
        </ul>
      </div>
      <div>
        <h4
          className="text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground"
           
        >
          Makers
        </h4>
        <ul className="mt-5 space-y-3">
          <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
               
              href="/join-as-dev"
             
            >
              Join as dev
            </a>
          </li>
          <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
              
              href="/submit-project"
             
            >
              Submit project
            </a>
          </li>
          <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
              
              href="/how-it-works"
          
            >
              Guides
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4
          className="text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground"
          
        >
          Company
        </h4>
        <ul className="mt-5 space-y-3">
          <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
               
              href="/"
           
            >
              About
            </a>
          </li>
          <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
             
              href="/"
            
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
               
              href="/"
          
            >
              Terms
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-14 border-t border-border pt-6">
      <p
        className="text-[14px] text-muted-foreground"
       
      >
        © 2026 DevConnect.
      </p>
    </div>
  </div>
</footer>
)}