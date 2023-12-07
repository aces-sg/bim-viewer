import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Amplify, API, graphqlOperation } from "aws-amplify";

// Graphql
import { listProjects } from "@/graphql/queries";

// Components
import ProjectCard from "@/components/ProjectCard";
import CommentsBox from "@/components/CommentsBox";

import { awsConfig } from "@/awsConfig";

Amplify.configure(awsConfig);

const Projects = () => {
  const [projects, setProjects] = useState<any[]>();
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const response: any = await API.graphql({
          query: listProjects,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        setProjects(response?.data?.listProjects?.items);
      } catch (err) {
        console.log("failed to get projects: ", err);
      }
    };

    getAllProjects();
  }, []);

  const closeCommentsBox = () => {
    setShowCommentsBox(false);
  };

  return (
    <>
      <div className="px-[15px] md:px-[20px] lg:px-[40px] py-[32px]">
        <div className="mb-[20px] flex items-center justify-between">
          <Link href="/projects/create">
            <button className="flex items-center justify-center w-[200px] bg-[#fddb00] rounded-full p-[8px] cursor-pointer font-sans font-semibold text-[16px] leading-[24px] text-[#000]">
              <Image
                priority
                src="/images/plusIcon.svg"
                width={14}
                height={14}
                alt="PlusIcon"
                className="mr-2"
              />
              <span>Add</span>
            </button>
          </Link>
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
          {projects &&
            projects.map(project => (
              <ProjectCard project={project} key={project.id} />
            ))}
        </div>
      </div>
      {showCommentsBox && <CommentsBox closeBox={closeCommentsBox} />}
    </>
  );
};

export default Projects;
