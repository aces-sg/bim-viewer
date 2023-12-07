import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Amplify, API, graphqlOperation } from "aws-amplify";

import { getProject } from "@/graphql/queries";

import CommentsBox from "@/components/CommentsBox";
import DocumentTree from "@/components/DocumentTree";

import { DocumentTreeItem } from "@/types";

import { awsConfig } from "@/awsConfig";

Amplify.configure(awsConfig);

const DocumentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projectName, setProjectName] = useState("");
  const [submissions, setSubmissions] = useState<any[]>();

  useEffect(() => {
    const getProjectData = async () => {
      try {
        let response: any = await API.graphql({
          query: getProject,
          variables: {
            id: id,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        setSubmissions(response.data.getProject.submissions);
        setProjectName(response.data.getProject.name);
      } catch (err) {
        console.log("failed to query submissions", err);
      }
    };

    getProjectData();
  }, [id]);

  const [showCommentsBox, setShowCommentsBox] = useState(false);

  const closeCommentsBox = () => {
    setShowCommentsBox(false);
  };

  console.log("submissions are ", submissions);

  return (
    <>
      <div className="bg-white px-[15px] md:px-[20px] lg:px-[40px] py-[32px]">
        <div className="flex items-center justify-between mb-[32px]">
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
        <div className="flex items-center mb-[16px]">
          <Image
            priority
            src="/images/yellowFolderIcon.svg"
            width={23.3}
            height={18.6}
            alt="yellowFolderIcon"
            className="mr-[16px]"
          />
          <h5 className="font-sans font-semibold text-[20px] leading-[30px] text-[#121212]">
            {projectName}
          </h5>
        </div>
        <div className="">
          {submissions &&
            submissions.map(documentItem => (
              <DocumentTree
                document={documentItem}
                key={documentItem.id}
                level={0}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default DocumentDetail;
