import React from "react";

import ProjectCard from "@/components/ProjectCard";

import { Project } from "@/types";

const projects: Project[] = [
  {
    id: 1,
    title: "Design Idea for Park",
    description: "Michael Harris, Amanda, Sarah Williams, and 5 Others",
  },
  {
    id: 2,
    title: "plans for oil drilling in the sea",
    description: "Carlos, Benny Friday, Paul Lewington",
  },
  {
    id: 3,
    title: "building construction at a city center hotel",
    description: "Christine Rodriguez, Fernando Alonso, Patrich Schick",
  },
  {
    id: 4,
    title: "Two island bridge construction planning team",
    description: "Rena Gonzalez, Paul Lemington, Wilson Senna",
  },
  {
    id: 5,
    title: "toll road repair planning",
    description: "Sarah West, Indira Winawan, Park Jung Hun",
  },
  {
    id: 6,
    title: "development planning team near the school",
    description: "Carlos, Benny Friday, Paul Lewington",
  },
  {
    id: 7,
    title: "Rescue team at marine drilling site",
    description: "Carlos, Benny Friday, Paul Lewington",
  },
  {
    id: 8,
    title: "Dive team for oil drilling site",
    description: "Carlos, Benny Friday, Paul Lewington",
  },
];

const Projects = () => {
  return (
    <div className="h-100 px-[20px] py-[32px]">
      <div className="grid grid-cols-4 gap-[20px]">
        {projects.map(project => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
