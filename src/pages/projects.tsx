import React, { useState } from "react";
import Image from "next/image";

import ProjectCard from "@/components/ProjectCard";
import CommentsBox from "@/components/CommentsBox";

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
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  const closeCommentsBox = () => {
    setShowCommentsBox(false);
  };

  return (
    <>
      <div className="min-h-full px-[10px] md:px-[20px] lg:px-[40px] py-[32px]">
        <div className="mb-[20px] flex items-center justify-end">
          <Image
            priority
            src="/images/chatIcon.svg"
            width={40}
            height={40}
            alt="ChatIcon"
            className="cursor-pointer"
            onClick={() => setShowCommentsBox(true)}
          />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {projects.map(project => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
      {showCommentsBox && <CommentsBox closeBox={closeCommentsBox} />}
    </>
  );
};

export default Projects;
