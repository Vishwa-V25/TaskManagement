import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

export const useProjects = () => {
  const { projects, dispatch } = useContext(ProjectContext);

  const addProject = (name) => {
    const newProject = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      tasks: []
    };

    dispatch({ type: "ADD_PROJECT", payload: newProject });
    return newProject.id;
  };

  const updateProject = (project) => {
    dispatch({ type: "UPDATE_PROJECT", payload: project });
  };

  const deleteProject = (id) => {
    dispatch({ type: "DELETE_PROJECT", payload: id });
  };

  return { projects, addProject, updateProject, deleteProject };
};