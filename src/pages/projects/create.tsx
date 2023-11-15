import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import * as LR from "@uploadcare/blocks";
import { Amplify, API } from "aws-amplify";

// Graphql
import { createProject } from "@/graphql/mutations";

import { awsConfig } from "@/awsConfig";

Amplify.configure(awsConfig);

LR.registerBlocks(LR);

interface ProjectItem {
  name: string;
  description: string;
  submissions: any[];
}

const CreateProject = () => {
  const widgetRef = useRef();
  const dataOutputRef = useRef<LR.DataOutput>();
  const router = useRouter();

  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [projectData, setProjectData] = useState<ProjectItem>({
    name: "",
    description: "",
    submissions: [],
  });

  async function updateSubmission(uploadCareFiles: any) {
    console.log(uploadCareFiles);
    let formattedFiles = uploadCareFiles.map((file: any) => {
      return {
        id: file.uuid,
        name: file.name,
        modelId: file.uuid,
        modelUrl: file.cdnUrl,
      };
    });

    setProjectData(projectData => {
      return { ...projectData, submissions: formattedFiles };
    });
  }

  useEffect(() => {
    const filesObj = localStorage.getItem("files");
    if (filesObj) {
      const currentFiles = JSON.parse(filesObj);
      setUploadedFiles(currentFiles);
    }

    window.addEventListener("LR_UPLOAD_FINISH", e => {
      let uploadCareFiles = e.detail.data;
      console.log("call LR_UPLOAD_FINISH::");
      updateSubmission([...uploadCareFiles]);
      setUploadedFiles([...uploadedFiles, ...e.detail.data]);
    });
  }, [uploadedFiles]);

  const handleUploaderEvent = useCallback(
    (e: CustomEvent<any>) => {
      const { data } = e.detail;
      console.log("data", data);
      setUploadedFiles([...uploadedFiles, ...data]);
    },
    [uploadedFiles],
  );

  useEffect(() => {
    const el = dataOutputRef.current;
  }, [handleUploaderEvent]);

  const handleCreateProject = async () => {
    try {
      const response = await API.graphql({
        query: createProject,
        variables: {
          input: projectData,
        },
      });
      console.log("create res::", response);
      if (response) {
        router.push("/projects");
      }
    } catch (err) {
      console.log("failed create Project", err);
    }
  };

  const handleChange = (value: string, fieldName: string) => {
    setProjectData(projectData => {
      return { ...projectData, [fieldName]: value };
    });
  };

  const isFormValid = useMemo(() => {
    return projectData.name &&
      projectData.description &&
      projectData.submissions.length > 0
      ? true
      : false;
  }, [
    projectData.description,
    projectData.name,
    projectData.submissions.length,
  ]);

  return (
    <div className="px-[15px] md:px-[20px] lg:px-[40px] py-[32px]">
      <h5 className="font-sans font-semibold text-[20px] leading-[30px] text-[#121212]">
        Create Project
      </h5>
      <div className="grid grid-cols-4 gap-4 my-4">
        <div>
          <div className="mb-[10px]">
            <label
              htmlFor="projectName"
              className="font-sans font-normal text-[14px] leading-[30px] text-[#121212]"
            >
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
              placeholder="Project Name"
              value={projectData.name}
              onChange={e => handleChange(e.target.value, "name")}
            />
          </div>
          <div className="mb-[10px]">
            <label
              htmlFor="projectDescription"
              className="font-sans font-normal text-[14px] leading-[30px] text-[#121212]"
            >
              Project Description
            </label>
            <input
              id="projectDescription"
              type="text"
              className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
              placeholder="Project Description"
              value={projectData.description}
              onChange={e => handleChange(e.target.value, "description")}
            />
          </div>
          <div className="my-[20px]">
            <lr-config
              ctx-name="my-uploader"
              pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLICKEY}
            />
            <lr-file-uploader-regular
              ref={widgetRef}
              ctx-name="my-uploader"
              class="uploaderCfg"
              css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.25.6/web/lr-file-uploader-regular.min.css"
            ></lr-file-uploader-regular>
          </div>
          <div className="mt-4">
            <button
              onClick={handleCreateProject}
              className="w-full bg-[#fddb00] rounded-full p-[8px] cursor-pointer font-sans font-semibold text-[16px] leading-[24px] text-[#000] disabled:opacity-25"
              disabled={!isFormValid}
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
      {/* <lr-data-output
        ref={dataOutputRef}
        use-console
        use-event
        // hidden
        ctx-name="my-uploader"
      /> */}
    </div>
  );
};

export default CreateProject;
