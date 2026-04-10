import { useState, useEffect } from "react";
import { useProjects } from "./hooks/useProjects";
import Navbar from "./components/Navbar";
import TaskBoard from "./components/TaskBoard";
import Dashboard from "./components/Dashboard";

export default function App() {
  const { projects, addProject, deleteProject } = useProjects();
  const [activeProjectId, setActiveProjectId] = useState(null);

  useEffect(() => {
    if (!activeProjectId && projects.length > 0) {
      setActiveProjectId(projects[0].id);
    }
  }, [projects]);

  const handleAddProject = (name) => {
    const id = addProject(name);
    setActiveProjectId(id);
  };

  const activeProject = projects.find(
    (p) => p.id === activeProjectId
  );

  return (
    <div className="app">
      <Navbar
        projects={projects}
        activeProjectId={activeProjectId}
        onSelect={setActiveProjectId}
        onAdd={handleAddProject}
        onDelete={deleteProject}  
      />

      <div className="workspace">
        {!activeProject && (
          <div className="empty-state">
            <h2>Select or create a project</h2>
          </div>
        )}

        {activeProject && (
          <>
            <TaskBoard project={activeProject} />
            <Dashboard tasks={activeProject.tasks} />
          </>
        )}
      </div>
    </div>
  );
}