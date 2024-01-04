import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { API } from "aws-amplify";
import { createComment } from "@/graphql/mutations";

interface Comments {
  id: number;
  user: string;
  createdAt: string;
  message: string;
}

interface Reply {
  id: string;
  replyOf: number;
  user: string;
  createdAt: string;
  message: string;
  childReplies?: Reply[]; // Nested array for child replies
}

interface CommentCardProps {
  comment: Comments;
  replies: Reply[];
  onReply: (commentId: number, reply: Reply) => void;
}

const CommentCard: FC<CommentCardProps> = ({ comment, replies, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  const handleReply = () => {
    setShowReplyInput(true);
  };

  const handleCancelReply = () => {
    setShowReplyInput(false);
    setReplyMessage('');
  };

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
    setShowReplyInput(false);
  };

  const handleSendReply = async () => {
    try {
      const apiData = {
        body: {
          input: {
            message: replyMessage,
            user: comment.user,
            replyOf: comment.id,
            project: "project-bim",
            mentions: ""
          }
        }
      };
      const response = await API.graphql({
        query: createComment, variables: {
          input: apiData.body.input
        }
      }
      );
      console.log('Reply created successfully:', response);
      const newReply: Reply = {
        id: response.data.createComment.id,
        replyOf: comment.id,
        user: response.data.createComment.user,
        createdAt: response.data.createComment.createdAt,
        message: response.data.createComment.message,
      };

    } catch (error) {
      console.error('Error creating reply:', error);
    }
    setShowReplyInput(false);
    setReplyMessage('');
  };

  useEffect(() => {
  }, []);

  const renderReplies = (reply: Reply) => (
    <div key={reply.id} className="ml-[20px] mt-[10px] border-l-[1px] border-solid border-[#aaa] pl-[10px]">
      <div className="flex items-center justify-between">
        <span className="font-sans font-semibold text-[14px] leading-[21px] text-[#000]">
          {reply.user}
        </span>
        <span className="font-sans font-normal text-[12px] leading-[18px] text-[#000]">
          {formatTimeAgo(reply.createdAt)}
        </span>
      </div>
      <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[16px]">
        {reply.message}
      </p>
      {reply.childReplies && (
        <div className="max-h-[200px] overflow-y-auto border border-solid border-[#ddd] rounded p-2">
          {reply.childReplies.reverse().map(renderReplies)}
        </div>
      )}
    </div>
  );

  function formatTimeAgo(timestamp: any) {
    const currentDate = new Date();
    const commentDate = new Date(timestamp);
    const timeDifference = currentDate - commentDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ago`;
    } else if (days < 30) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (months < 12) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const formattedDate = commentDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      return formattedDate;
    }
  }

  const formattedTime = formatTimeAgo(comment.createdAt);

  return (
    <div className="bg-white p-[16px] mb-[16px]">
      <div className="flex items-center justify-between mb-[16px]">
        <div className="flex items-center">
          <div className="bg-[#fddb00] w-[28px] h-[28px] flex items-center justify-center rounded-full font-sans font-semibold text-[12px] leading-[18px] text-[#000] cursor-pointer">
            {comment.user ? comment.user.substring(0, 2) : ''}
          </div>
          <span className="ml-2 font-sans font-semibold text-[14px] leading-[21px] text-[#000]">
            {comment.user}
          </span>
        </div>
        <p className="font-sans font-normal text-[12px] leading-[18px] text-[#000]">
          {formattedTime}
        </p>
      </div>
      <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[16px]">
        {comment.message}
      </p>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleReply()}
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
        {replies.filter(reply => reply.replyOf === comment.id).length > 0 && (
          <button
            className="flex items-center justify-center w-[129px] bg-[#fddb00] rounded-full p-[4px] cursor-pointer font-sans font-semibold text-[14px] leading-[24px] text-[#000] ml-[10px]"
            onClick={handleToggleReplies}
          >
            {showReplies
              ? 'Hide Replies'
              : `Show ${replies.filter(reply => reply.replyOf === comment.id).length === 1
                ? '1 Reply'
                : `${replies.filter(reply => reply.replyOf === comment.id).length} Replies`
              }`}
          </button>
        )}
      </div>
      {showReplies &&
        replies?.map((reply) => {
          if (reply.replyOf === comment.id) {
            return renderReplies(reply);
          }
          return null;
        })}
      {showReplyInput && (
        <div className="flex items-center mt-[16px]">
          <input
            type="text"
            className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[38px]"
            placeholder="Write a Message"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
          <button onClick={handleSendReply} className="flex items-center justify-center w-[129px] bg-[#fddb00] rounded-full p-[8px] cursor-pointer font-sans font-semibold text-[14px] leading-[24px] text-[#000] ml-[10px]">
            <Image
              priority
              src="/images/planeIcon.svg"
              width={14.5}
              height={14.5}
              alt="planeIcon"
              className="mr-2"
            />
            <span>Reply</span>
          </button>
          <button className="flex items-center justify-center w-[129px] bg-[#fddb00] rounded-full p-[8px] cursor-pointer font-sans font-semibold text-[14px] leading-[24px] text-[#000] ml-[10px]" onClick={handleCancelReply}>
            <span>Cancel</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
