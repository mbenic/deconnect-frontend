import { useState, useContext } from "react";
import SignupModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

import { ChoicesContext } from "../context/ChoicesContext";
import { AuthContext } from "../context/AuthContext";


export default function JoinAsDev() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const choices = useContext(ChoicesContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    level: "",
    about: "",
    portfolio: "",
    linkedin: "",
    github: "",
    availability: "",
    work_preference: "",
    projects: "",
  });

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedVibes, setSelectedVibes] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

  const toggleItem = (id, setState) => {
     const numId = Number(id);
  setState(prev =>
    prev.includes(numId)
      ? prev.filter(item => item !== numId) // remove
      : [...prev, numId] // add
  );
};


//   const handleSubmit = async (e) => {
//   e.preventDefault();


//   // Gate here  
//   if (!user || !token) {
//     setShowLoginModal(true);
//     return;
//   }


//   try {
//     const payload = {
//       name: form.name,
//       description: form.description,
//       city: form.city,
//       level: form.level,
//       about: form.about,
//       portfolio: form.portfolio,
//       linkedin: form.linkedin,
//       github: form.github,
//       availability: form.availability,
//       work_preference: form.work_preference,
//       projects: form.projects,
//       stage: form.stage,

//       // ManyToMany fields (IDs only)
//       skills: selectedSkills.map(Number),
//       vibes: selectedVibes.map(Number),
//       industries: selectedIndustries.map(Number),
//     };

//     console.log("Submitting payload:", payload);

//     const res = await fetch(`${API_URL}/devs/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//          Accept: "application/json",
         
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       console.error("Server error:", errorData);

//        // Extract readable message
//       const messages = Object.entries(errorData)
//         .map(([key, value]) => {
//           if (Array.isArray(value)) {
//             return `${key}: ${value.join(", ")}`;
//           }
//           return `${key}: ${value}`;
//         })
//         .join("\n");

//       alert((messages || "Submission failed: ") );

//       return;
//     }

//     const data = await res.json();
//     console.log("Developer created:", data);

//     // reset
//     setForm({
//       name: "",
//       email: "",
//       city: "",
//       level: "",
//       about: "",
//       portfolio: "",
//       linkedin: "",
//       github: "",
//       availability: "",
//       work_preference: "",
//       projects: "",
//     });

//     setSelectedSkills([]);
//     setSelectedIndustries([]);
//     setSelectedVibes([]);

//     navigate("/devs/"); // redirect to developers page

//   } catch (err) {
//     console.error("Submit failed:", err);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Gate here
  if (!user || !token) {
    setShowLoginModal(true);
    return;
  }

  const payload = {
    name: form.name,
    description: form.description,
    city: form.city,
    level: form.level,
    about: form.about,
    portfolio: form.portfolio,
    linkedin: form.linkedin,
    github: form.github,
    availability: form.availability,
    work_preference: form.work_preference,
    projects: form.projects,
    stage: form.stage,

    // ManyToMany IDs
    skills: selectedSkills.map(Number),
    vibes: selectedVibes.map(Number),
    industries: selectedIndustries.map(Number),
  };

  console.log("Submitting payload:", payload);

  try {
    const res = await fetch(`${API_URL}/devs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // Handle backend errors
    if (!res.ok) {
      console.error("Server error:", data);

      // Handle existing dev redirect
      if (data.detail === "Developer profile already exists.") {
        alert("You already have a developer profile. Redirecting to your profile page.");
      
         navigate("/devs/"); // Redirect to developers page
        return;
      }

      // Handle normal DRF validation errors
      const messages = Object.entries(data)
        .map(([key, value]) =>
          Array.isArray(value)
            ? `${key}: ${value.join(", ")}`
            : `${key}: ${value}`
        )
        .join("\n");

      alert(messages || "Submission failed");
      return;
    }

    console.log("Developer created:", data);

    // Reset form
    setForm({
      name: "",
      email: "",
      city: "",
      level: "",
      about: "",
      portfolio: "",
      linkedin: "",
      github: "",
      availability: "",
      work_preference: "",
      projects: "",
    });

    setSelectedSkills([]);
    setSelectedIndustries([]);
    setSelectedVibes([]);

    navigate("/devs/");

  } catch (err) {
    console.error("Submit failed:", err);
    alert("Network error. Please try again.");
  }
};


  return (
    <main className="bg-surface pb-24 pt-12 md:pt-16">
      {/* MODALS */}
      {showModal && <SignupModal onClose={() => setShowModal(false)} />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      {/* PAGE WRAPPER */}
      <div className="mx-auto max-w-[820px] px-5 md:px-10 mb-12 md:mb-14">
        

        {/* BANNER (same structure as Submit page). If user is not logged in, show banner*/}
     
        {!user && (
        <div className="mb-8">
          <div className="rounded-[16px] border border-primary/20 bg-banner px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <p className="text-[14px] text-banner-foreground">
              Save your progress and get matched faster by creating a free account.
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <button
                className="text-[14px] font-semibold text-primary hover:underline"
                onClick={() => setShowLoginModal(true)}
              >
                Log in
              </button>

              <span className="text-muted-foreground text-[13px]">or</span>

              <button
                onClick={() => setShowModal(true)}
                className="rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground hover:bg-primary-dark transition-all"
              >
                Create account
              </button>
            </div>
          </div>
        </div>
        )}

        {/* HEADER (MATCH SubmitProject STYLE) */}
        <h1 className="font-heading text-[40px] sm:text-[52px] md:text-[64px] font-semibold tracking-[-0.025em] leading-[1.02] text-foreground">
          Join as a developer
        </h1>

        <p className="mt-5 text-[17px] sm:text-[18px] leading-relaxed text-muted-foreground max-w-[600px]">
          Build your profile and get matched with projects that fit your skills.
        </p>
      </div>

      {/* FORM WRAPPER */}
      <div className="px-5 md:px-10">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[820px] space-y-5"
        >
          <Section title="The basics">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Full name" name="name" value={form.name} onChange={handleChange} />
              <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              <Select label="City" name="city" value={form.city} onChange={handleChange} options={choices.city} />
              <Select label="Level" name="level" value={form.level} onChange={handleChange} options={choices.levels} />
            </div>

            <Textarea label="About you" name="about" value={form.about} onChange={handleChange} />
          </Section>

          <Section title="Your links">
            <Input label="Portfolio" name="portfolio" value={form.portfolio} onChange={handleChange} />
            <Input label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />
            <Input label="GitHub" name="github" value={form.github} onChange={handleChange} />
          </Section>

          {/* <Section title="Skills & tech stack">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <h3 className="text-[13px] font-semibold uppercase text-muted-foreground mb-2">
                  {cat.label}
                </h3>
                <ToggleGroup
                  items={cat.skills}
                  selected={selectedSkills}
                  onToggle={(item) =>
                    toggleItem(item, selectedSkills, setSelectedSkills)
                  }
                />
              </div>
            ))}
          </Section> */}

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
                  toggleItem(Number(item.id), setSelectedSkills)
                  }
                />
              </div>
            ))}
          </Section>

          <Section title="Industries">
            <ToggleGroup
              items={choices.industries}
              selected={selectedIndustries}
              onToggle={(item) =>
                toggleItem(Number(item.id), setSelectedIndustries)
              }
            />
          </Section>

          <Section title="Availability & preferences">
            <Select label="Availability" name="availability" value={form.availability} onChange={handleChange} options={choices.availabilities} />
            <Select label="Work preference" name="work_preference" value={form.work_preference} onChange={handleChange} options={choices.work_preferences} />
          </Section>

          <Section title="Past projects">
            <Textarea name="projects" value={form.projects} onChange={handleChange} />
          </Section>

          <Section title="Your vibe">
            <ToggleGroup
              items={choices.vibes}
              selected={selectedVibes}
              onToggle={(item) =>
                toggleItem(Number(item.id), setSelectedVibes)
              }
            />
          </Section>

          <button
            type="submit"
            className="w-full rounded-full bg-primary px-7 py-4 text-[16px] font-semibold text-primary-foreground transition-all hover:bg-primary-dark"
          >
            Submit profile
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