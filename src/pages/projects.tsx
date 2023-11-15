import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import {
  Amplify,
  API,
  Auth,
  withSSRContext,
  graphqlOperation,
} from "aws-amplify";

import { listProjects } from "@/graphql/queries";
import { createProject } from "@/graphql/mutations";

import ProjectCard from "@/components/ProjectCard";
import CommentsBox from "@/components/CommentsBox";

import { Project } from "@/types";

// Amplify.configure({ ...awsExports, ssr: true });

let myAppConfig = {
  aws_appsync_graphqlEndpoint:
    "https://afwhe7xgwrdmfkq5tiiv7xqpqu.appsync-api.ap-southeast-1.amazonaws.com/graphql",
  aws_appsync_region: "ap-southeast-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-e2hggodm3fb2dlzbby3ihtu5ci",
};
Amplify.configure(myAppConfig);

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

let mockInput = {
  name: "test",
  description: "test",
  submissions: [
    {
      id: "test",
      name: "Fake Project name",
      modelId: "test",
      modelUrl: "https://google.com",
    },
  ],
};

const Projects = ({ projects = [] }) => {
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  async function listAllProjects() {
    try {
      // let res = await API.graphql({
      //   query: listProjects,
      // });
      const response = await API.graphql(graphqlOperation(listProjects));
      // setProjects(res.data.listProjects.items);
      console.log("res::", response);
    } catch (err) {
      console.log("failed to get projects: ", err);
    }
  }

  useEffect(() => {
    listAllProjects();
  }, []);

  const closeCommentsBox = () => {
    setShowCommentsBox(false);
  };

  const handleCreateProject = async () => {
    try {
      const response = await API.graphql({
        query: createProject,
        variables: {
          input: mockInput,
        },
      });
      console.log("create res::", response);
    } catch (err) {
      console.log("failed create Project", err);
    }
  };

  return (
    <>
      <div className="px-[15px] md:px-[20px] lg:px-[40px] py-[32px]">
        <div className="mb-[20px] flex items-center justify-between">
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
        <button onClick={handleCreateProject}>Create Project</button>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {/* {projects.map(project => (
            <ProjectCard project={project} key={project.id} />
          ))} */}
        </div>
      </div>
      {showCommentsBox && <CommentsBox closeBox={closeCommentsBox} />}
    </>
  );
};

export default Projects;
