import React, { FC } from "react";
import Image from "next/image";
import { Comment } from "@/types";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
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
      <div className="flex items-center cursor-pointer">
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
    </div>
  );
};

export default CommentCard;
