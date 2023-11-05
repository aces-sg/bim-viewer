import React, { FC, useState } from "react";
import Image from "next/image";
import { Comment } from "@/types";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  return (
    <div className="bg-white p-[16px] mb-[16px]">
      <div className="flex items-center justify-between mb-[16px]">
        <div className="flex items-center">
          <div className="bg-[#fddb00] w-[28px] h-[28px] flex items-center justify-center rounded-full font-sans font-semibold text-[12px] leading-[18px] text-[#000] cursor-pointer">
            AN
          </div>
          <span className="ml-2 font-sans font-semibold text-[14px] leading-[21px] text-[#000]">
            {comment.name}
          </span>
        </div>
        <p className="font-sans font-normal text-[12px] leading-[18px] text-[#000]">
          {comment.time}
        </p>
      </div>
      <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[16px]">
        {comment.description}
      </p>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setShowReplyInput(true)}
      >
        <Image
          priority
          src="/images/replyIcon.svg"
          width={18}
          height={15}
          alt="replyIcon"
          className="cursor-pointer mr-2"
        />
        <span className="font-sans font-normal text-[16px] leading-[24px] text-[#000]">
          Reply
        </span>
      </div>
      {showReplyInput && (
        <div className="flex items-center mt-[16px]">
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
            <span>Reply</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
