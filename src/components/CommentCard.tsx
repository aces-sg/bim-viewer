import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { API } from "aws-amplify";
import { createComment } from "@/graphql/mutations";
import { Mention, MentionsInput } from "react-mentions";

interface Comments {
  mentions: any;
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
  userData: any[];
}

const CommentCard: FC<CommentCardProps> = ({ comment, replies, onReply, userData }) => {
  type UserData = { id: number, display: string };

  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [mentionedUsers, setMentionedUsers] = useState<UserData[]>([]);

  const inputRef = useRef();

  const renderMentionedUsers = (message: string, mentionedUserIds: string[]) => {
    let renderedMessage = message;
    mentionedUserIds.forEach((userId) => {
      const user = userData.find((u) => u.id === userId);
      if (user) {
        const name = user.display;
        const regex = new RegExp(`@${userId}`, 'gi');
        renderedMessage = renderedMessage.replace(
          regex,
          `<span style="background-color: yellow; padding: 2px; border-radius: 3px; display: inline-block;">${name}</span>`
        );
      }
    });
    return <div dangerouslySetInnerHTML={{ __html: renderedMessage }} />;
  };
  
  const calculateRows = () => {
    const numberOfLines = replyMessage.split('\n').length;
    return Math.min(numberOfLines + 1, 5);
  };
  
  const handleReply = () => {
    setShowReplyInput(true);
  };

  const handleCancelReply = () => {
    setShowReplyInput(false);
    setReplyMessage('');
  };

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleSendReply = async () => {
    try {
      const mentionedUserIds = mentionedUsers.map(user => user.id);
      const apiData = {
        body: {
          input: {
            message: replyMessage,
            user: comment.user,
            replyOf: comment.id,
            project: "project-bim",
            mentions: mentionedUserIds
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
    setMentionedUsers([]);
    setShowReplyInput(false);
    setReplyMessage('');
  };

  useEffect(() => {
  }, [mentionedUsers]);

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

  
  const handleUserSelection = (user: UserData) => {
    const isAlreadyMentioned = mentionedUsers.some(mentionedUser => mentionedUser.id === user.id);
  
    if (!isAlreadyMentioned) {
      setMentionedUsers(prevUsers => [...prevUsers, user]);
    }
  };

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
      <div className="comment-message">
        {comment.mentions && comment.mentions.length > 0 ? (
          renderMentionedUsers(comment.message, comment.mentions)
        ) : (
          comment.message
        )}
      </div>
      </p>
      <div
        className="flex items-center cursor-pointer"
      >
        <Image
          priority
          src="/images/replyIcon.svg"
          width={18}
          height={15}
          alt="replyIcon"
          className="cursor-pointer mr-2"
        />
        <span className="font-sans font-normal text-[16px] leading-[24px] text-[#000]" onClick={() => setShowReplyInput(true)}>
          Reply
        </span>
        {replies.filter(reply => reply.replyOf === comment.id).length > 0 && (
          <span
          className="underline cursor-pointer font-sans font-semibold text-[14px] leading-[24px] text-[#0070f3] ml-[10px]"
          onClick={handleToggleReplies}
        >
          {showReplies
            ? 'Hide Replies'
            : `${
                replies.filter(reply => reply.replyOf === comment.id).length === 1
                  ? '1 Reply'
                  : `${replies.filter(reply => reply.replyOf === comment.id).length} Replies`
              }`
          }
        </span>
        )}
      </div>
      {showReplies &&
        replies?.map((reply) => {
          if (reply.replyOf === comment.id) {
            return renderReplies(reply);
          }
          return null;
        })}
       
      {showReplyInput && !showReplies && (
        <div className="flex items-center mt-[16px]">
          <MentionsInput
          className="rounded-[8px] sm:w-full md:w-[480px] lg:w-[350px]"
          inputRef={inputRef}
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          rows={calculateRows()}
          style={{
            control: {
              backgroundColor: "#fff",
              fontSize: 14,
              fontWeight: "normal",
              maxHeight: "200px",
            },
            "&multiLine": {
              control: {
                fontFamily: "monospace"
              },
              highlighter: {
                padding: 9,
                border: "1px solid transparent",
                maxHeight: "200px",
                overflowY: 'hidden'
              },
              input: {
                padding: 9,
                border: "1px solid silver",
                overflowY: "auto",
              },
            },
            "&singleLine": {
              control: {
                fontFamily: "monospace"
              },
              highlighter: {
                padding: 9,
                border: "1px solid transparent",
                maxHeight: "200px",
                overflowY: 'hidden'
              },
              input: {
                padding: 9,
                border: "1px solid silver",
                overflowY: "auto",
              },
            },
            suggestions: {
              list: {
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.15)",
                fontSize: 14,
                maxHeight: "200px",
                overflowY: "scroll",
              },
              item: {
                padding: "5px 15px",
                borderBottom: "1px solid rgba(0,0,0,0.15)",
                "&focused": {
                  backgroundColor: "#fddb00",
                },
              },
            },
          }}
          placeholder="Write a Message"
          forceSuggestionsAboveCursor={true}
        >
          <Mention
            trigger="@"
            markup="@__display__"
            appendSpaceOnAdd={true}
            data={userData}
            renderSuggestion={(
              suggestion,
              search,
              highlightedDisplay,
              index,
              focused,
            ) => (
              <div className={`user ${focused ? "focused" : ""}`}>
                {highlightedDisplay}
              </div>
            )}
            style={{ backgroundColor: "#fddb00" }}
            onAdd={(id, display) => handleUserSelection({ id, display })}
          />
        </MentionsInput>
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
