import React, { useState, useEffect } from "react";
import axios from "axios";

const theme = {
  SidebarItems:
    "font-display tracking-tight py-2 px-2 hover:rounded-l-xl hover:border hover:bg-zinc-800 cursor-pointer",
  HomeCards: "w-1/2 mx-2 bg-zinc-700 shadow-lg rounded-lg bg-zinc-900 py-10",
  HomeProject: "px-5 bg-zinc-700 shadow-lg rounded-lg bg-zinc-900 py-10",
  ProjectCards:
    "flex py-5 justify-around content-around items-center border rounded-xl bg-zinc-900",
};

function RenderProject() {
  const [projects, setProjects] = useState([]);
  let projectPath = "/drive";

  const projectCompleted = {
    status: "Completed",
    isCompleted: "true",
    progress: "100",
    completedFile: projectPath,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/projects");
        // (response);
        if (response.data.success) {
          setProjects(response.data.data);
        } else if (response == null || response.data == null) {
          alert("No projects found");
        } else {
          console.error("Failed to fetch projects:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // State to manage project completion status
  const [completedProjects, setCompletedProjects] = useState([]);

  // Function to handle completion of a project
  const handleCompleteProject = async (id) => {
    try {
      id;
      const response = await axios.put(`/project/${id}`, projectCompleted);
      response;
      if (response.data.success) {
        alert("Project marked as completed!");
        setCompletedProjects(updatedProjects);
      } else {
        alert("Cannot mark as completed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle cancellation of a project
  const handleCancelProject = async (id) => {
    try {
      const response = await axios.post("/project/delete", { id });
      response;
      if (response.data.success) {
        alert("Project Cancled!");
        setCompletedProjects(updatedProjects);
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div className='flex flex-col gap-5 h-full'>
        <h1 className='font-condensed text-5xl font-bold'>Current Projects</h1>
        <div className='flex flex-col gap-2'>
          {projects.map((project, index) => (
            <div key={index} className={`${theme.ProjectCards}`}>
              <div className='w-1/2 flex flex-col gap-2 text-center content-between px-5'>
                <p className='text-info text-xl font-semibold'>
                  {project.projectName}
                </p>
                <h2 className='text-info font-condensed text-5xl font-bold'>
                  {project.status}
                </h2>
                <div className='flex justify-around'>
                  <button
                    className='border-2 bg-zinc-900 text-white rounded-md px-2 py-1 hover:invert'
                    onClick={() => handleCompleteProject(project._id)}
                    disabled={completedProjects.includes(project._id)}>
                    Completed
                  </button>
                  <button
                    className='border-2 bg-zinc-900 text-white rounded-md px-2 py-1 hover:invert'
                    onClick={() => handleCancelProject(project._id)}>
                    Delete
                  </button>
                </div>
              </div>
              <div>
                {/* <img src={project.image} alt={project.title} /> */}
                <div className='text-info '>Budget : {project.budget}$</div>
                <div className='text-info '>User Email: {project.email}</div>
                <div className='text-info '>
                  Project Created : {project.updatedAt}
                </div>
                <div className='text-info '>
                  Project Deadline: {project.endDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RenderProject;
