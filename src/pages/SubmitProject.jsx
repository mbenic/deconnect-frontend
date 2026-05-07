import { useState, useEffect, useContext } from "react";
import SignupModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal";
import { API_URL } from "../config";
import { Navigate, useNavigate } from "react-router-dom";


import { ChoicesContext } from "../context/ChoicesContext";
import { AuthContext } from "../context/AuthContext";



export default function SubmitProject() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();


  

const choices = useContext(ChoicesContext);


  const [form, setForm] = useState({
    fullName: "",
    email: "",
    projectName: "",
    industry: "",
    description: "",
    timeline: "",
    type: "",
    budget: "",
    stage: "",
    city: "",
  });

  const [selectedSkills, setSelectedSkills] = useState([]);


  // if (user === null) return <p>Loading...</p>;

  // if (!user) return <Navigate to="/login" />;


  //  loading state
 if (loading) return <p>Loading...</p>;

   


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const toggleItem = (id, setState) => {
  setState(prev =>
    prev.includes(id)
      ? prev.filter(item => item !== id) // remove
      : [...prev, id] // add
  );
};

 

  const handleSubmit = async (e) => {
  e.preventDefault();

   // Gate here  
  if (!user || !token) {
    setShowLoginModal(true);
    return;
  }

  
  try {
    const payload = {
      title: form.title,
      description: form.description,
      city: form.city,
      type: form.type,
      budget: form.budget,
      timeline: form.timeline,
      stage: form.stage,

      // ManyToMany fields (IDs only)
      skills_needed: selectedSkills,
      industries: Array.isArray(form.industry)
        ? form.industry
        : [form.industry], // adjusted depending on UI
    };

    console.log("Submitting payload:", payload);

    const res = await fetch(`${API_URL}/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
         
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server error:", errorData);

       // Extract readable message
      const messages = Object.entries(errorData)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.join(", ")}`;
          }
          return `${key}: ${value}`;
        })
        .join("\n");

      alert((messages || "Submission failed: ") );
      return;
    }

    const data = await res.json();
    console.log("Project created:", data);

    // reset
    setForm({
      fullName: "",
      email: "",
      title: "",
      description: "",
      industry: "",
      city: "",
      timeline: "",
      type: "",
      budget: "",
      stage: "",
    });

    setSelectedSkills([]);

    navigate("/projects/"); // redirect to projects page

  } catch (err) {
    console.error("Submit failed:", err);
  }
};


  return (
    <main className="bg-surface pb-24 pt-12 md:pt-16">
      {/* MODALS */}
      {showModal && <SignupModal onClose={() => setShowModal(false)} />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      {/* HEADER */}
      <div className="mx-auto max-w-[820px] px-5 md:px-10 mb-12 md:mb-14">
        
        {/* If user is not logged in, show banner */}
        {!user && (
        <div className="mb-8">
          <div className="rounded-[16px] border border-primary/20 bg-banner px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <p className="text-[14px] text-banner-foreground">
              Save your progress and get matched faster by creating a free account.
            </p>

            <div className="flex items-center gap-3">
              <button
                className="text-[14px] font-semibold text-primary hover:underline"
                onClick={() => setShowLoginModal(true)}
              >
                Log in
              </button>

              <span className="text-muted-foreground text-[13px]">or</span>

              <button
                onClick={() => setShowModal(true)}
                className="rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground hover:bg-primary-dark"
              >
                Create account
              </button>
            </div>
          </div>
        </div> )}

        <h1 className="text-[40px] sm:text-[52px] md:text-[64px] font-semibold text-foreground">
          Submit a project
        </h1>

        <p className="mt-5 text-muted-foreground max-w-[600px]">
          Tell us what you're building. We'll match you with developers.
        </p>
      </div>

      {/* FORM */}
      <div  className="px-5 md:px-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-[820px] space-y-5">

          {/* BASICS */}
          <Section title="The basics">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
              />

              <Input
                label="Project name"
                name="title"
                value={form.title}
                onChange={handleChange}
              />

              <Select
                label="Industry"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                // options={INDUSTRIES}
                options={choices.industries}
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Section>

          {/* SKILLS */}
          <Section title="Skills & tech stack">
            {choices.skills.map((cat) => (
              <div key={cat.label}>
                <h3 className="text-[13px] font-semibold uppercase text-muted-foreground mb-2">
                  {cat.label}
                </h3>

                <ToggleGroup
                  items={cat.skills}
                  selected={selectedSkills}
                  onToggle={(item) =>
                  toggleItem(item.id, setSelectedSkills)
                  }
                />
              </div>
            ))}
          </Section>

          {/* DETAILS */}
          <Section title="Project details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label="Timeline"
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
                // options={TIMELINES}
                options={choices.timeline}
              />

              <Select
                label="Opportunity type"
                name="type"
                value={form.type}
                onChange={handleChange}
                // options={TYPES}
                options={choices.type}
              />

              <Select
                label="Budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                // options={BUDGETS}
                options={choices.budget}
              />

              <Select
                label="Project stage"
                name="stage"
                value={form.stage}
                onChange={handleChange}
                // options={PROJECT_STAGES}
                options={choices.stage}
              />

              <Select
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                // options={CITIES}
                options={choices.city}
              />
            </div>
          </Section>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-4 text-white font-semibold"
          >
            Submit project
          </button>
        </form>
      </div>
    </main>
  );
}

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <section className="rounded-[24px] border border-border bg-background p-7 md:p-10 space-y-5">
      <h2 className="font-heading text-[22px] font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Input({ label, name, value, onChange, type = "text", required }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[14px] font-medium text-foreground">{label}</label>
      <input
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 outline-none"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
  
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-[14px] font-medium text-foreground">{label}</label>}
      <textarea
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 outline-none resize-none"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[14px] font-medium text-foreground">{label}</label>
      <select
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 outline-none"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}

// function ToggleGroup({ items, selected, onToggle }) {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {items.map((item) => {
//         const active = selected.includes(item);
//         return (
//           <button
//             key={item}
//             type="button"
//             onClick={() => onToggle(item)}
//             className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all
//               ${
//                 active
//                   ? "bg-primary text-primary-foreground border-primary"
//                   : "bg-background border-border text-foreground hover:border-primary/50"
//               }`}
//           >
//             {item}
//           </button>
//         );
//       })}
//     </div>
//   );
// }


function ToggleGroup({ items, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = selected.includes(item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item)}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all
              ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-foreground hover:border-primary/50"
              }`}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}