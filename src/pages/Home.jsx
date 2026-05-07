export default function Home() {
  return (
    // <section className="py-20 px-6 max-w-4xl mx-auto text-center">
    //   <h1 className="text-4xl font-bold text-indigo-600 mb-6">
    //     About Crowdfund
    //   </h1>

    //   <p className="text-lg text-gray-700 leading-relaxed">
    //     Crowdfund connects creators with passionate supporters.
    //     We empower innovation by making it easy to raise funds
    //     for technology, gaming, art, and community-driven ideas.
    //   </p>
    // </section>

  <main className="flex flex-col ">
  <section className="mx-auto max-w-[1320px] px-5 md:px-10 pt-6 my-10">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-banner px-5 sm:px-7 py-4 sm:py-5">
      <p
        className="text-[15px] sm:text-[17px] font-semibold text-banner-foreground leading-snug"

      >
        Hire devs and designers ready today.
      </p>
      <a
        className="flex items-center gap-1 text-[15px] font-semibold text-banner-foreground underline underline-offset-4 hover:text-primary transition-colors whitespace-nowrap"
        href="/join-as-dev"
        data-discover="true"
      >
        <span >Get started</span>
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
          className="lucide lucide-chevron-right"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
    </div>
  </section>


  <section className="mx-auto w-full max-w-[1320px] px-5 md:px-10 pb-20">
     <h2 className="font-heading text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.02em] text-foreground max-w-[760px]">
   
      Find talent for your project 
    </h2>
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-code-xml text-icon-bg-foreground"
            aria-hidden="true"
          >
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
         
        >
          Frontend &amp; Web
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-server text-icon-bg-foreground"
            aria-hidden="true"
          >
            <rect width={20} height={8} x={2} y={2} rx={2} ry={2} />
            <rect width={20} height={8} x={2} y={14} rx={2} ry={2} />
            <line x1={6} x2="6.01" y1={6} y2={6} />
            <line x1={6} x2="6.01" y1={18} y2={18} />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
          
        >
          Backend &amp; APIs
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-palette text-icon-bg-foreground"
            aria-hidden="true"
          >
            <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
         
        >
          UI / UX Design
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-smartphone text-icon-bg-foreground"
            aria-hidden="true"
          >
            <rect width={14} height={20} x={5} y={2} rx={2} ry={2} />
            <path d="M12 18h.01" />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
        
        >
          Mobile Apps
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sparkles text-icon-bg-foreground"
            aria-hidden="true"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx={4} cy={20} r={2} />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
         
        >
          AI &amp; ML
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-bag text-icon-bg-foreground"
            aria-hidden="true"
          >
            <path d="M16 10a4 4 0 0 1-8 0" />
            <path d="M3.103 6.034h17.794" />
            <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
          
        >
          Shopify &amp; WordPress
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-compass text-icon-bg-foreground"
            aria-hidden="true"
          >
            <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
            <circle cx={12} cy={12} r={10} />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
         
        >
          Product &amp; Strategy
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-cloud text-icon-bg-foreground"
            aria-hidden="true"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
          
        >
          DevOps &amp; Cloud
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-brush text-icon-bg-foreground"
            aria-hidden="true"
          >
            <path d="m11 10 3 3" />
            <path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" />
            <path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
          data-text-id="home.categories.brand"
        >
          Brand &amp; Identity
        </h3>
      </div>
      <div
        className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_-12px_rgba(20,168,0,0.25)] cursor-pointer"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-layers text-icon-bg-foreground"
            aria-hidden="true"
          >
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
          </svg>
        </div>
        <h3
          className="text-[15px] font-semibold text-card-foreground leading-snug"
          data-text-id="home.categories.fullstack"
        >
          Full Stack
        </h3>
      </div>
    </div>
  </section>

  
  <section className="bg-surface py-20 md:py-24">
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <div className="max-w-[720px]">
       
        <h2
          className="mt-3 font-heading text-[32px] sm:text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] text-surface-foreground"
          
          style={{ opacity: 1, transform: "none" }}
        >
         Find the perfect match for your project
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-4">
        <div
          className="relative rounded-2xl bg-background p-8 border border-border"
          style={{ opacity: 1, transform: "none" }}
        >
          <span className="font-heading text-[56px] font-bold text-primary leading-none">
            01
          </span>
          <h3
            className="mt-6 font-heading text-[22px] font-semibold text-foreground"
             
          >
            Create an account 
          </h3>
          <p
            className="mt-3 text-[15px] leading-relaxed text-muted-foreground"
             
          >
           Create an account or login with your existing credentials to get started. 
          </p>
        </div>
 <div
          className="relative rounded-2xl bg-background p-8 border border-border"
          style={{ opacity: 1, transform: "none" }}
        >
          <span className="font-heading text-[56px] font-bold text-primary leading-none">
            02
          </span>
          <h3
            className="mt-6 font-heading text-[22px] font-semibold text-foreground"
            
          >
            Join as Developer 
          </h3>
          <p
            className="mt-3 text-[15px] leading-relaxed text-muted-foreground"
             
          >
            Create a developer profile showcasing your skills, experience and projects. Highlight your expertise and what you bring to the table.
          </p>
        </div>

        <div
          className="relative rounded-2xl bg-background p-8 border border-border"
          style={{ opacity: 1, transform: "none" }}
        >
          <span className="font-heading text-[56px] font-bold text-primary leading-none">
            03
          </span>
          <h3
            className="mt-6 font-heading text-[22px] font-semibold text-foreground"
            
          >
            Post your project and Match with devs
          </h3>
          <p
            className="mt-3 text-[15px] leading-relaxed text-muted-foreground"
            data-text-id="home.howItWorks.step2.body"
          >
             Tell us what you're building and your timeline and what success looks
            like . Browse profiles          </p>
        </div>
        <div
          className="relative rounded-2xl bg-background p-8 border border-border"
          style={{ opacity: 1, transform: "none" }}
        >
          <span className="font-heading text-[56px] font-bold text-primary leading-none">
            04
          </span>
          <h3
            className="mt-6 font-heading text-[22px] font-semibold text-foreground"
            data-text-id="home.howItWorks.step3.title"
          >
            Build together
          </h3>
          <p
            className="mt-3 text-[15px] leading-relaxed text-muted-foreground"
             
          >
            Collaborate and build your project with new teammates.
          </p>
        </div>
      </div>
    </div>
  </section>
 
 
</main>
  );
}



