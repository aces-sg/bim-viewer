/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
    createRef,
  } from "react";
  import Image from "next/image";
  import { useRouter } from "next/router";
  import * as LR from "@uploadcare/blocks";
  // import { Widget, WidgetAPI } from "@uploadcare/react-widget";
  import { Amplify, API } from "aws-amplify";
  
  // Graphql
  import { createProject, updateProject } from "@/graphql/mutations";
  import { getProject } from "@/graphql/queries";
  
  import { awsConfig } from "@/awsConfig";
  
  Amplify.configure(awsConfig);
  
  LR.registerBlocks(LR);
  
  LR.FileUploaderRegular.shadowStyles = /* CSS */ `
    :host lr-simple-btn {
      width: 100%;
      height: 40px;     
    }
  
    :host lr-simple-btn button {
      width: 100%;
      height: 100%;
      border-radius: 40px;
      background-color: #fddb00;
  
      &:hover {
        background-color: #fddb00;
      }
    }
  
    :host lr-simple-btn button span {
      font-size: 16px;
      line-height: 20px;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      text-transform: capitalize;
    }
  
    :host lr-copyright {
      display: none;
    }
  `;
  
  interface ProjectItem {
    name: string;
    description: string;
    submissions: any[];
  }
  
  const UpdateProject = () => {
    const widgetRef = useRef();
    const router = useRouter();
    const { id } = router.query;
    const [projectData, setProjectData] = useState<ProjectItem>({
      name: "",
      description: "",
      submissions: [],
    });
  
    async function updateSubmission(uploadCareFiles: any, type: string) {
      let formattedFiles = uploadCareFiles.map((file: any) => {
        return {
          id: file.uuid,
          name: file.name,
          modelId: file.uuid,
          modelUrl: file.cdnUrl,
        };
      });
  
      if (type === "add") {
        setProjectData(projectData => {
          return { ...projectData, submissions: formattedFiles };
        });
      } else {
        const newSubmissions = projectData.submissions.filter(
          submission =>
            !formattedFiles.map((file: any) => file.id).includes(submission.id),
        );
        setProjectData(projectData => {
          return { ...projectData, submissions: newSubmissions };
        });
      }
    }

    async function getProjectData() {
      try {
        let response: any = await API.graphql({
          query: getProject,
          variables: {
            id: id,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        setProjectData(response.data.getProject);
      } catch (err) {
        console.log("failed to query submissions", err);
      }
    }
  
    const handleUpdateProject = async () => {
      try {
        const response = await API.graphql({
          query: updateProject,
          variables: {
            input: {
              id: id,
              name: projectData.name,
              description: projectData.description,
              // submissions: projectData.submissions || [],
            }
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        if (response) {
          router.push(`/projects/${id}`);
        }
      } catch (err) {
        console.log("failed update Project", err);
      }
    };
  
    const handleChange = (value: string, fieldName: string) => {
      setProjectData(projectData => {
        return { ...projectData, [fieldName]: value };
      });
    };
  
    const isFormValid = useMemo(() => {
      return projectData.name && projectData.description ? true : false;
    }, [projectData.description, projectData.name]);
  
    useEffect(() => {
      window.addEventListener("LR_UPLOAD_FINISH", e => {
        let uploadCareFiles = e.detail.data;
        updateSubmission([...uploadCareFiles], "add");
      });
  
      window.addEventListener("LR_REMOVE", e => {
        let uploadCareFiles = e.detail.data;
        updateSubmission([...uploadCareFiles], "delete");
      });
    }, [updateSubmission]);

    useEffect(() => {
      getProjectData();
    }, [])
  
    return (
      <div className="px-[15px] md:px-[20px] lg:px-[40px] py-[32px]">
        <h5 className="font-sans font-semibold text-[20px] leading-[30px] text-[#121212]">
          Update Project
        </h5>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <div className="mb-[10px]">
              <label
                htmlFor="projectName"
                className="font-sans font-bold text-[14px] leading-[30px] text-[#121212]"
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
                className="font-sans font-bold text-[14px] leading-[30px] text-[#121212]"
              >
                Project Description
              </label>
              <textarea
                id="projectDescription"
                className="block rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[88px]"
                placeholder="Project Description"
                value={projectData.description}
                onChange={e => handleChange(e.target.value, "description")}
              />
            </div>
            <div className="my-[20px]">
              {projectData?.submissions?.length > 0 && (
                <div>
                  <p className="font-sans font-bold text-[14px] leading-[30px] text-[#121212] mb-[10px]">
                    Submissions
                  </p>
                  <div>
                    {projectData?.submissions?.map((submission, index) => (
                      <div className="flex items-center mb-[5px]" key={index}>
                        <div className="w-[24px] h-[24px] flex items-center justify-center mr-[10px]">
                          <Image
                            priority
                            src={`/images/fileIcon.svg`}
                            width={16}
                            height={20}
                            alt="fileIcon"
                          />
                        </div>
                        <span className="font-sans font-normal text-[14px] leading-[30px] text-[#121212]">
                          {submission.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <div className="my-[20px]">
                <lr-config
                  ctx-name="my-uploader"
                  pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLICKEY}
                  sourceList="local, dropbox, gdrive"
                  store={false}
                />
                <lr-file-uploader-regular
                  ref={widgetRef}
                  ctx-name="my-uploader"
                  class="uploaderCfg"
                  css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.25.6/web/lr-file-uploader-regular.min.css"
                  nodeValue={null}
                ></lr-file-uploader-regular>
              </div> */}
            </div>
            <div className="mt-4">
              <button
                onClick={handleUpdateProject}
                className="flex items-center justify-center w-[200px] bg-[#fddb00] rounded-full p-[8px] cursor-pointer font-sans font-semibold text-[16px] leading-[24px] text-[#000]"
                disabled={!isFormValid}
              >
                <Image
              priority
              src="/images/update.svg"
              width={20}
              height={20}
              alt="Update Icon"
              className="mr-2"
            />
                <span>Update Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UpdateProject;
  