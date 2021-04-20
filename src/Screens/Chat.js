import { useQuery, useSubscription, useMutation } from "@apollo/client";
import React, { useEffect, useState, useRef } from "react";
import { getMessages, getOneGroup } from "../gql/queries";
import { useSelector, useDispatch } from "react-redux";
import { newMessage } from "../gql/subscription";
import { messageConstants } from "../redux/constants/index";
import { createMessage } from "../gql/mutations";

const Chat = ({ match }) => {
  //redux
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const { user } = auth;

  //component level state
  const [content, setContent] = useState("");
  const msgEndRef = useRef(null);

  //func to scroll to bottom of div
  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  //to list message
  const { loading, data, error } = useQuery(getMessages, {
    variables: { group: match.params.roomId.toString() },
  });

  //to get group info
  //to list message
  const { data: groupData } = useQuery(getOneGroup, {
    variables: { id: match.params.roomId.toString() },
  });

  //to subscribe to new message
  const { data: messageData, error: messageError } = useSubscription(
    newMessage
  );

  //send a message
  const [sendMsg, { loading: loadingSendMessage }] = useMutation(
    createMessage,
    {
      update(_, res) {
        setContent("");
        scrollToBottom();
      },
      oneEror(err) {
        //set local error state
        console.log(err, "error");
      },
    }
  );

  const messageSendHandler = () => {
    if (content.trim().length === "") return;
    else {
      const group = String(match.params.roomId);

      sendMsg({
        variables: { group, content },
      });
    }
  };

  useEffect(() => {
    console.log(loadingSendMessage);
    if (messageData?.newMessage) {
      dispatch({
        type: messageConstants.ADD_MESSAGE,
        payload: messageData.newMessage,
      });
    }

    console.log(messageError, error);
    // eslint-disable-next-line
  }, [dispatch, messageData]);

  useEffect(() => {
    scrollToBottom();
    if (data?.getMessages) {
      if (data.getMessages.group === String(match.params.roomId)) {
        scrollToBottom();
      }
      dispatch({
        type: messageConstants.FETCH_MESSAGES,
        payload: data.getMessages,
      });
    }
  }, [data, dispatch, match.params.roomId]);

  if (loading) return <h4>Loading</h4>;

  return (
    <div className="chat-box-wrapper">
      {/* {error || (messageError && <h4>Eerror </h4>)} */}
      <div className="chat-box-header">
        <div
          className="chat-box-header-image"
          style={{ backgroundImage: `url(${groupData?.getOneGroup.image})` }}
        ></div>
        <p>{groupData?.getOneGroup.name}</p>
      </div>
      <div className="chat-main-box" ref={msgEndRef}>
        {message?.messages
          ?.slice()
          .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
          .map((item) => (
            <div className={"chat-item"} key={item._id}>
              <p
                className={`chat-item-content ${
                  item.sender.userId === user._id ? "right-align" : ""
                }`}
              >
                {item.content}
              </p>
              {item.sender.userId !== user._id && (
                <p className="chat-item-username">{item?.sender?.userName}</p>
              )}
            </div>
          ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div onClick={messageSendHandler} className="chat-send-button">
          Send
        </div>
      </div>
    </div>
  );
};

export default Chat;
