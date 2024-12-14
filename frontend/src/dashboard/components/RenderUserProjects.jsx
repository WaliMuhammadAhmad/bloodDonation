import React, { useState, useEffect } from "react";
import axios from "axios";

const theme = {
  ProjectCards:
    "flex p-2 justify-around items-center border rounded-xl bg-zinc-900",
};

function RenderUserProjects() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/project/${storedUser._id}`);
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

  return (
    <div className='flex flex-col gap-5 h-full'>
      <h1 className='font-condensed text-5xl font-bold'>Current Projects</h1>
      <div className='flex flex-col gap-2'>
        {projects.map((project, index) => (
          <div key={index} className={`${theme.ProjectCards}`}>
            <div className='w-1/2 flex flex-col gap-5 text-center px-5'>
              <div className='text-info text-lg font-semibold'>
                {project.projectName}
              </div>
              <div className='flex flex-col items-center text-info font-condensed text-8xl font-bold'>
                {project.progress}%
                <progress
                  className='progress progress-info w-56'
                  value={project.progress}
                  max='100'></progress>
              </div>
              <div className='text-info '>Status : {project.status}</div>
            </div>
            <div>
              {/* <img src={project.image} alt={project.title} /> */}
              <div className='text-info '>Budget : {project.budget}$</div>
              <div className='text-info '>Deadline: {project.endDate}</div>
            </div>
            {/* <div className="flex flex-col gap-2 p-5 border-l">
              <p>Phase 1</p>
              <progress
                className="progress progress-info w-56"
                value={projects[index].progress.phase1}
                max="100"
              ></progress>
              <p>Phase 2</p>
              <progress
                className="progress progress-info w-56"
                value={projects[index].progress.phase2}
                max="100"
              ></progress>
              <p>Phase 3</p>
              <progress
                className="progress progress-info w-56"
                value={projects[index].progress.phase3}
                max="100"
              ></progress>
              <p>Phase 4</p>
              <progress
                className="progress progress-info w-56"
                value={projects[index].progress.phase4}
                max="100"
              ></progress>
              <p>Phase 5</p>
              <progress
                className="progress progress-info w-56"
                value={projects[index].progress.phase5}
                max="100"
              ></progress>
            </div> */}
          </div>
        ))}
      </div>
      {/* <div tabIndex={0} className="collapse collapse-plus font-display border border-zinc-800 bg-zinc-900">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-zinc-900 tracking-tight text-lg peer-checked:bg-zinc-700 peer-checked:text-white">
                    Previous Projects
                </div>
                <div tabIndex={0} className="collapse-content flex flex-col gap-2 text-md peer-checked:bg-zinc-700 peer-checked:text-white">
                {projects.map((project, index) => (
                    <div key={index} className={`${theme.ProjectCards}`}>
                        <div className='w-1/2 flex flex-col gap-2 text-center px-5'>
                            <div className="text-info text-lg font-semibold">{project.title}</div>
                            <div className="text-info font-condensed text-8xl font-bold">{project.progress}%</div>
                            <div className="text-info ">1 Phases remaining</div>
                        </div>
                        <div className="w-20 rounded">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className='flex flex-col gap-2 p-5 border-l'>
                            <p>Phase 1</p><progress className="progress progress-info w-56" value={project.phase1} max="100"></progress>
                            <p>Phase 2</p><progress className="progress progress-info w-56" value={project.phase2} max="100"></progress>
                            <p>Phase 3</p><progress className="progress progress-info w-56" value={project.phase3} max="100"></progress>
                            <p>Phase 4</p><progress className="progress progress-info w-56" value={project.phase4} max="100"></progress>
                            <p>Phase 5</p><progress className="progress progress-info w-56" value={project.phase5} max="100"></progress>
                        </div>
                    </div>
                ))}
                </div>
            </div> */}
    </div>
  );
}

export default RenderUserProjects;
