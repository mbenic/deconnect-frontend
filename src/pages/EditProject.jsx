import { useState, useEffect, useContext } from "react";
import SignupModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal";
import { API_URL } from "../config";
import { Navigate, useNavigate , useParams} from "react-router-dom";


import { ChoicesContext } from "../context/ChoicesContext";
import { AuthContext } from "../context/AuthContext";



export default function EditProject() {
  const { id } = useParams();
  const { user, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  

const choices = useContext(ChoicesContext);


  const [project, setProject] = useState({
    fullName: "",
    title: "",
    industry: "",
    description: "",
    timeline: "",
    type: "",
    budget: "",
    stage: "",
    city: "",
  });

  const [selectedSkills, setSelectedSkills] = useState([]);

  

  //  loading state
 if (loading) return <p>Loading...</p>;

  
 // Fetch project data
  useEffect(() => {
    fetch(`${API_URL}/projects/${id}/`)
      .then((res) => res.json())
      .then((data) => {

          setProject({
            fullName: data.owner.first_name + " " + data.owner.last_name,
            title: data.title || "",
            description: data.description || "",

            city: data.city || "",
            type: data.type || "",
            budget: data.budget || "",
            timeline: data.timeline || "",
            stage: data.stage || "",

            industry: data.industries?.[0]?.id || "",
          });

          setSelectedSkills(
            data.skills?.map((skill) => skill.id) || []
          );
        })
      .catch((err) => {
        console.error("Error fetching project:", err);
       
      });
  }, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;

    setProject((prev) => ({
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
      title: project.title,
      description: project.description,
      city: project.city,
      type: project.type,
      budget: project.budget,
      timeline: project.timeline,
      stage: project.stage,

      // ManyToMany fields (IDs only)
      skills_needed: selectedSkills,
      industries: project.industry ? [project.industry] : [],
    };

    console.log("Submitting payload:", payload);

    const res = await fetch(`${API_URL}/projects/${id}/`, {
      method: "PATCH",  
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
    console.log("Project updated:", data);

    // reset
    setProject({
      fullName: "",
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

    //navigate("/projects/"); // redirect to projects page
     navigate(`/projects/${id}`); // Redirect to the newly created project page

  } catch (err) {
    console.error("Update failed:", err);
  }
};



const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/projects/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete project");
    }

    alert("Project deleted");

    navigate("/projects");

  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

  return (
    <main className="bg-surface pb-24 pt-12 md:pt-16">
      {/* HEADER */}
      <div className="mx-auto max-w-[820px] px-5 md:px-10 mb-12 md:mb-14">
        
        <h1 className="text-[40px] sm:text-[52px] md:text-[64px] font-semibold text-foreground">
          Edit project
        </h1>

        <p className="mt-5 text-muted-foreground max-w-[600px]">
          This project belongs to {project.fullName || "unknown user"}. Edit the details and update the project information here.
        </p>
      </div>

      {/* FORM */}
      <div  className="px-5 md:px-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-[820px] space-y-5">

          {/* BASICS */}
          <Section title="The basics">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* <Input
                label="Full name"
                name="fullName"
                value={project.fullName}
                onChange={handleChange}
              /> */}

              {/* <Input
                label="Email"
                name="email"
                value={project.email}
                onChange={handleChange}
                type="email"
              /> */}

              <Input
                label="Project name"
                name="title"
                value={project.title}
                onChange={handleChange}
              />

              <Select
                label="Industry"
                name="industry"
                value={project.industry}
                onChange={handleChange}
                // options={INDUSTRIES}
                options={choices.industries}
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={project.description}
              onChange={handleChange}
            />
          </Section>

          {/* SKILLS */}
          <Section title="Skills & tech stack">
            {choices?.skills?.map((cat) => (
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
                value={project.timeline}
                onChange={handleChange}
                // options={TIMELINES}
                options={choices?.timeline || []}
              />

              <Select
                label="Opportunity type"
                name="type"
                value={project.type}
                onChange={handleChange}
                // options={TYPES}
                options={choices?.type || []}
              />

              <Select
                label="Budget"
                name="budget"
                value={project.budget}
                onChange={handleChange}
                // options={BUDGETS}
                options={choices.budget || []}
              />

              <Select
                label="Project stage"
                name="stage"
                value={project.stage}
                onChange={handleChange}
                // options={PROJECT_STAGES}
                options={choices?.stage || []}
              />

              <Select
                label="City"
                name="city"
                value={project.city}
                onChange={handleChange}
                // options={CITIES}
                options={choices?.city || []}
              />
            </div>
          </Section>

          {/* SUBMIT */}
          <div className="flex justify-between gap-3"> 
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-4 text-white font-semibold"
          >
            Update project
          </button>

          <button
              type="button"
              onClick={handleDelete}
              className="w-full rounded-full border border-red-500 py-4 text-red-500 font-semibold hover:bg-red-50"
            >
              Delete project
            </button>
          </div>
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