import React, { useEffect, useState } from "react";
import axios from "axios";

const theme = {
  HomeCards:
    "w-1/2 mx-2 bg-zinc-700 shadow-lg rounded-lg bg-zinc-900 py-10",
  HomeProject: "px-5 bg-zinc-700 shadow-lg rounded-lg bg-zinc-900 py-10",
  ProjectCards: "flex justify-around items-center border rounded-xl bg-zinc-900",
};

function RenderUserHome() {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [projects, setProjects] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/project/${storedUser._id}`);
        if (response.data.success) {
          setProjects(response.data.data);
          
          const spentBudget = response.data.data.reduce(
            (total, project) => total + project.budget,
            0
          );
          setTotalSpent(spentBudget);
          
          setTotalProjects(response.data.data.length);
        } else if (response == null || response.data == null) {
          alert("No projects found");
        } else {
          console.error(
            "Failed to fetch projects:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center h-[77vh]">
        <div className="flex w-full gap-2">
          <div className={`${theme.HomeCards}`}>
            <div className="flex flex-col gap-2 text-center">
              <div className="text-[#CDEA68] text-lg font-semibold">
                Total Spent
              </div>
              <div className="text-[#CDEA68] font-condensed text-8xl font-bold">
                ${totalSpent}
              </div>
            </div>
          </div>
          <div className={`${theme.HomeCards}`}>
            <div className="flex flex-col gap-2 text-center">
              <div className="text-[#CDEA68] text-lg font-semibold">
                Total Projects
              </div>
              <div className="text-[#CDEA68] font-condensed text-8xl font-bold">
                {totalProjects}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-zinc-900 shadow-lg rounded-lg px-2 py-5 flex gap-5">
          {projects.map((project, index) => (
            <div key={index} className={`${theme.ProjectCards}`}>
              <div className={`${theme.HomeProject}`}>
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-[#CDEA68] text-xl font-semibold">
                    {project.projectName}
                  </div>
                  <div className="text-[#CDEA68] font-condensed text-4xl font-bold">
                    Status : {project.status}
                  </div>
                  <div className="text-[#CDEA68] flex flex-col">Progress</div>
                  <progress
                    className="progress progress-warning w-56"
                    value={project.progress}
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RenderUserHome;