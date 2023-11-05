import React, { FC } from "react";
import Image from "next/image";
import CommentCard from "./CommentCard";
import { Comment } from "@/types";

interface CommentsBoxProps {
  closeBox: () => void;
}

const comments: Comment[] = [
  {
    id: 1,
    name: "James Arthur",
    time: "5 mins ago",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sit sagittis lorem pellentesque sed. Eget elit nunc accumsan tempor. Augue id sit eleifend fermentum in aenean.",
  },
  {
    id: 2,
    name: "Francisca Lorraine",
    time: "5 mins ago",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sit sagittis lorem pellentesque sed. Eget elit nunc accumsan tempor. Augue id sit eleifend fermentum in aenean.",
  },
  {
    id: 3,
    name: "James Arthur",
    time: "5 mins ago",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sit sagittis lorem pellentesque sed. Eget elit nunc accumsan tempor. Augue id sit eleifend fermentum in aenean.",
  }
];

const CommentsBox: FC<CommentsBoxProps> = ({ closeBox }) => {
  return (
    <div className="fixed top-0 right-0 sm:w-full md:w-[500px] lg:w-[500px] h-full shadow-[-4px_0px_8px_0px_rgba(0,0,0,0.1)] bg-[#f2f2f2] z-40 overflow-y-scroll">
      <div className="bg-white px-[20px] py-[16px] flex items-center justify-between">
        <h5 className="font-sans font-semibold text-[20px] leading-[30px] text-[#000]">
          Comments
        </h5>
        <Image
          priority
          src="/images/closeIcon.svg"
          width={11}
          height={11}
          alt="closeIcon"
          className="cursor-pointer"
          onClick={closeBox}
        />
      </div>
      <div className="px-[20px] pt-[20px] pb-[80px]">
        {comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}
      </div>
      <div className="fixed w-[490px] bottom-0 flex items-center bg-white px-[20px] py-[16px]">
        <input
          type="text"
          className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[38px]"
          placeholder="Write a Message"
        />
        <button className="flex items-center justify-center w-[129px] bg-[#fddb00] rounded-full p-[8px] cursor-pointer font-sans font-semibold text-[16px] leading-[24px] text-[#000] ml-[10px]">
          <Image
            priority
            src="/images/planeIcon.svg"
            width={17.5}
            height={17.5}
            alt="planeIcon"
            className="mr-2"
          />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default CommentsBox;
