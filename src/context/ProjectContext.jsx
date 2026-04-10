import { createContext, useReducer, useEffect } from "react";

export const ProjectContext = createContext();

// Load from localStorage
const initialState = {
  projects: JSON.parse(localStorage.getItem("projects")) || []
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        )
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (p) => p.id !== action.payload
        )
      };

    default:
      return state;
  }
};

// Provider
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(state.projects));
  }, [state.projects]);

  return (
    <ProjectContext.Provider
      value={{ projects: state.projects, dispatch }}
    >
      {children}
    </ProjectContext.Provider>
  );
};