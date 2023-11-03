import React, { FC } from "react";
import Image from "next/image";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-[8px] p-[20px] border-[1px] border-solid border-[#aaa]">
      <div className="flex items-start justify-between mb-[16px]">
        <h5 className="font-sans font-semibold text-[16px] leading-[24px] text-[#000] capitalize">
          {project.title}
        </h5>
        <Image
          priority
          src="/images/threeDot.svg"
          width={4}
          height={16}
          alt="threeDotIcon"
          className="cursor-pointer ml-10"
        />
      </div>
      <div className="flex">
        <p className="font-sans font-normal text-[12px] leading-[18px] text-[#666] capitalize">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
