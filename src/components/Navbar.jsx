import { useState } from "react";

export default function Navbar({
  projects,
  activeProjectId,
  onSelect,
  onAdd,
  onDelete
}) {
  const [projectName, setProjectName] = useState("");

  const handleCreate = () => {
    if (!projectName.trim()) return;
    onAdd(projectName.trim());
    setProjectName("");
  };

  return (
    <div className="navbar">
      <h2 className="logo">WorkFlowX</h2>

      <div className="project-input">
        <input
          type="text"
          placeholder="New project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      <div className="project-list">
        {projects.length === 0 && <div>No projects yet</div>}

        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-card ${
              project.id === activeProjectId ? "active" : ""
            }`}
          >
            <div onClick={() => onSelect(project.id)}>
              <div>{project.name}</div>
              <small>Created</small>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}