import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Amplify, API, graphqlOperation } from "aws-amplify";

import { listProjects } from "@/graphql/queries";
import { createProject } from "@/graphql/mutations";

import ProjectCard from "@/components/ProjectCard";
import CommentsBox from "@/components/CommentsBox";
import * as LR from "@uploadcare/blocks";

import { Project } from "@/types";

let myAppConfig = {
  aws_appsync_graphqlEndpoint:
    "https://afwhe7xgwrdmfkq5tiiv7xqpqu.appsync-api.ap-southeast-1.amazonaws.com/graphql",
  aws_appsync_region: "ap-southeast-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-e2hggodm3fb2dlzbby3ihtu5ci",
};
Amplify.configure(myAppConfig);

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

LR.registerBlocks(LR);

LR.FileUploaderRegular.shadowStyles = /* CSS */ `
  :host lr-simple-btn button {
    background-color: transparent !important;
    border: none !important;

    &:hover {
      background-color: transparent !important;
    }
  }

  :host lr-drop-area {
    // background: #0061fe;
    // color: white;
    // min-height: 40px;
  }

  :host lr-copyright {
    display: none;
  }
`;

const Projects = () => {
  const widgetRef = useRef();
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  async function listAllProjects() {
    try {
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
        <lr-config
          ctx-name="my-uploader"
          pubkey={process.env.GATSBY_UPLOADCARE_KEY}
        />
        <div className="mb-[20px] flex items-center justify-between">
          <lr-file-uploader-regular
            ref={widgetRef}
            ctx-name="my-uploader"
            class="uploaderCfg"
            css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.25.6/web/lr-file-uploader-regular.min.css"
          ></lr-file-uploader-regular>
          {/* <button className="flex items-center justify-center w-[200px] bg-[#fddb00] rounded-full p-[8px] cursor-pointer font-sans font-semibold text-[16px] leading-[24px] text-[#000]">
            <Image
              priority
              src="/images/plusIcon.svg"
              width={14}
              height={14}
              alt="PlusIcon"
              className="mr-2"
            />
            <span>Add</span>
          </button> */}
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
