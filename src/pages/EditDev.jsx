import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

import { ChoicesContext } from "../context/ChoicesContext";
import { AuthContext } from "../context/AuthContext";

export default function EditDev() {
  const { id } = useParams();

  const { user, token } = useContext(AuthContext);
  const choices = useContext(ChoicesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [dev, setDev] = useState(null);

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

  useEffect(() => {
    const fetchDev = async () => {
      try {
        const res = await fetch(`${API_URL}/devs/${id}/`);

        if (!res.ok) {
          throw new Error("Failed to fetch developer");
        }

        const data = await res.json();

        console.log("Developer data:", data);

          // Check ownership FIRST
        if (data.user_id !== user.user_id) { //change from data.id to data.user_id based on your API response
            //alert("You don't have permission to edit this project.");
            navigate("/");
            return;
          }

        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          city: data.city || "",
          level: data.level || "",
          about: data.about || "",
          portfolio: data.links.portfolio || "",
          linkedin: data.links.linkedin || "",
          github: data.links.github || "",
          availability: data.availability || "",
          work_preference: data.work_preference || "",
          projects: data.projects || "",
        });

        setDev(`${data.first_name} ${data.last_name}`.trim());

        setSelectedSkills(data.skills?.map((s) => s.id) || []);
        setSelectedIndustries(data.industries?.map((i) => i.id) || []);
        setSelectedVibes(data.vibes?.map((v) => v.id) || []);
      } catch (err) {
        console.error("Error fetching developer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDev();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleItem = (id, setState) => {
    const numId = Number(id);

    setState((prev) =>
      prev.includes(numId)
        ? prev.filter((item) => item !== numId)
        : [...prev, numId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,

        skills: selectedSkills,
        industries: selectedIndustries,
        vibes: selectedVibes,
      };

      console.log("Updating developer:", payload);

      const res = await fetch(`${API_URL}/devs/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();

        console.error("Update error:", errorData);

        const messages = Object.entries(errorData)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: ${value.join(", ")}`;
            }

            return `${key}: ${value}`;
          })
          .join("\n");

        alert(messages || "Update failed");

        return;
      }

      const data = await res.json();

      console.log("Updated developer:", data);

      navigate(`/devs/${data.id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) {
    return (
      <main className="px-5 py-10">
        <p>Loading...</p>
      </main>
    );
  }



  const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this developer profile?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/devs/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete developer profile");
    }

    alert("Developer profile deleted");

    navigate("/devs");

  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};



  return (
    <main className="bg-surface pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[820px] px-5 md:px-10 mb-12 md:mb-14">
        <h1 className="font-heading text-[40px] sm:text-[52px] md:text-[64px] font-semibold tracking-[-0.025em] leading-[1.02] text-foreground">
          Edit developer profile
        </h1>

        <p className="mt-5 text-[17px] sm:text-[18px] leading-relaxed text-muted-foreground max-w-[600px]">
          { dev } update your developer profile and keep your information current.
        </p>
      </div>

      <div className="px-5 md:px-10">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[820px] space-y-5"
        >
          <Section title="The basics">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="First name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
              />

              <Input
                label="Last name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
              />
           

              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />

              <Select
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                options={choices.city}
              />

              <Select
                label="Level"
                name="level"
                value={form.level}
                onChange={handleChange}
                options={choices.levels}
              />
            </div>

            <Textarea
              label="About you"
              name="about"
              value={form.about}
              onChange={handleChange}
            />
          </Section>

          <Section title="Your links">
            <Input
              label="Portfolio"
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
            />

            <Input
              label="LinkedIn"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
            />

            <Input
              label="GitHub"
              name="github"
              value={form.github}
              onChange={handleChange}
            />
          </Section>

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
            <Select
              label="Availability"
              name="availability"
              value={form.availability}
              onChange={handleChange}
              options={choices.availabilities}
            />

            <Select
              label="Work preference"
              name="work_preference"
              value={form.work_preference}
              onChange={handleChange}
              options={choices.work_preferences}
            />
          </Section>

          <Section title="Past projects">
            <Textarea
              name="projects"
              value={form.projects}
              onChange={handleChange}
            />
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

          {/* <button
            type="submit"
            className="w-full rounded-full bg-primary px-7 py-4 text-[16px] font-semibold text-primary-foreground transition-all hover:bg-primary-dark"
          >
            Update profile
          </button> */}

        {/* SUBMIT */}
          <div className="flex justify-between gap-3"> 
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-4 text-white font-semibold"
              >
                Update profile
              </button>

              <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full rounded-full border border-red-500 py-4 bg-red-500 text-white font-semibold hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  Delete Profile
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

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[14px] font-medium text-foreground">
        {label}
      </label>

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
      {label && (
        <label className="text-[14px] font-medium text-foreground">
          {label}
        </label>
      )}

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
      <label className="text-[14px] font-medium text-foreground">
        {label}
      </label>

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