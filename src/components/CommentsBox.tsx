  import React, { FC, useEffect, useState, useRef } from "react";
  import Image from "next/image";
  import CommentCard from "./CommentCard";
  import { MentionsInput, Mention } from 'react-mentions';
  import { API, Amplify } from 'aws-amplify';
  import { createComment } from "@/graphql/mutations";
  import { getUser, listComments, listUsers } from "@/graphql/queries";
  import { User } from "@/API";
  import { getCurrentUser } from "@/components/Auth/auth";
  import { awsConfig } from "@/awsConfig";

  Amplify.configure(awsConfig);

  interface CommentsBoxProps {
    closeBox: () => void;
  }

  interface Reply {
    id: string;
    replyOf: number; // ID of the parent comment
    user: string;
    createdAt: string;
    message: string;
  }

  const CommentsBox: FC<CommentsBoxProps> = ({ closeBox }) => {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [commentMessage, setCommentMessage] = useState('');
    const [replies, setReplies] = useState<Reply[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [filteredComments, setFilteredComments] = useState<any[]>();
    const [comments, setComments] = useState<any[]>();
    const [mentionedUsers, setMentionedUsers] = useState<UserData[]>([]);

    const inputRef = useRef();

    useEffect(() => {
      // Scroll to the end of the input when content changes
      if (inputRef?.current) {
        inputRef.current.scrollTop = inputRef.current.scrollHeight;
      }
    }, [commentMessage]);

    const handleInputChange = (e) => {
      setCommentMessage(e.target.value);
    };

    const calculateRows = () => {
      const numberOfLines = commentMessage.split('\n').length;
      return Math.min(numberOfLines + 1, 5);
    };

    async function listAllComments() {
      try {
        const response: any = await API.graphql({
          query: listComments,
        });
        const allComments = response?.data?.listComments?.items || [];

        // Sort comments by createdAt in descending order
        const sortedComments = allComments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
        setComments(sortedComments.filter(comment => comment.replyOf === ''));
        const filteredComments = sortedComments.filter(comment => comment.replyOf !== '');
        setFilteredComments(filteredComments);
      } catch (err) {
        console.log("failed to get comments: ", err);
      }
    }    

    const handleReply = async (commentId: number, reply: Reply) => {
      try {
        const apiData = {
          body: {
            input: {
              message: reply.message,
              user: user?.name ? user?.name : user?.email,
              replyOf: commentId,
              project: "YourProjectIdentifier",
              mentions: ""
            }
          }
        };
        const response = await API.graphql({
          query: createComment, variables: {
            input: apiData.body.input
          }
        });
        console.log('Reply created successfully:', response);
        const updatedComments = comments.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment
        );

        setComments(updatedComments);
        setReplies([...replies, reply]);
      } catch (error) {
        console.error('Error creating reply:', error);
      }
    };

    type UserData = { id: number, display: string };
    const extractMentions = (text: string): UserData[] => {
      const mentions: UserData[] = [];
      const mentionRegex = /@(\w*)/g;
      let match;
      while ((match = mentionRegex.exec(text)) !== null) {
        const query = match[1].toLowerCase();
        console.log("user is00>", match);
        if (!query) {
          return []; // Return an empty array when there's no query
        }
        const matchedUser = userData.find(user =>
          user.display.toLowerCase() === query || user.id.toString().toLowerCase().includes(query)
        );
    
        if (matchedUser) {
          mentions.push(matchedUser);
        }
      }
      return mentions;
    };

    async function getUserDetails() {
      try {
        let res = await getCurrentUser();
        if (res && res.sub) {
          let userDetails: any = await API.graphql({
            query: getUser,
            variables: {
              id: res.sub,
            },
          });
          setUser(userDetails.data.getUser);
        }
      } catch (err) {
        console.log("failed to get user", err);
      }
    }

    async function fetchUsers() {
      try {
        const response: any = await API.graphql({
          query: listUsers,
        });
        const usersFromGraphQL = response?.data?.listUsers?.items || [];
        const updatedUserData = usersFromGraphQL.map((user: any) => ({
          id: user.id,
          display: user.name || user.email,
        }));
        setUserData(updatedUserData);
      } catch (err) {
        console.log("failed to get projects: ", err);
      }
    }

    const handleUserSelection = (user: UserData) => {
      const isAlreadyMentioned = mentionedUsers.some(mentionedUser => mentionedUser.id === user.id);
    
      if (!isAlreadyMentioned) {
        setMentionedUsers(prevUsers => [...prevUsers, user]);
      }
    };

    const handleSend = async () => {
      if (commentMessage.trim() === '') {
        return;
      }
      const mentionedUserIds = mentionedUsers.map(user => user.id);
      console.log('Mentioned Users:', mentionedUserIds);
      try {
        const apiData = {
          body: {
            input: {
              message: commentMessage,
              user: user?.name ? user?.name : user?.email,
              replyOf: "",
              project: "",
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
        console.log('Comment created successfully:', response);
      } catch (error) {
        console.error('Error creating comment:', error);
      }
      setMentionedUsers([]);
      setReplyTo(null);
      setCommentMessage('');
    };

    useEffect(() => {
      listAllComments();
      fetchUsers();
    }, [comments, userData]);

    useEffect(() => {
      getUserDetails();
    }, [user]);

    useEffect(() => {
      console.log('Mentioned Users:', mentionedUsers);
    }, [mentionedUsers]);
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
          {comments?.map(comment => (
            <CommentCard
              key={comment.id}
              comment={comment}
              replies={filteredComments || []}
              onReply={handleReply}
              userData={userData}
            />
          ))}
        </div>
        <div className="fixed sm:w-full md:w-[480px] lg:w-[480px] bottom-0 flex items-center bg-white px-[20px] py-[16px]">
        <MentionsInput
          className="rounded-[8px] sm:w-full md:w-[480px] lg:w-[350px]"
          inputRef={inputRef}
          value={commentMessage}
          onChange={handleInputChange}
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
            markup="@[__display__](user:id)"
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
          <button className="flex self-end fixed right-6 items-center justify-center w-[100px] bg-[#fddb00] rounded-full py-[8px] cursor-pointer font-sans font-semibold text-[16px] leading-[24px] text-[#000] ml-[10px]" onClick={handleSend}>
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
