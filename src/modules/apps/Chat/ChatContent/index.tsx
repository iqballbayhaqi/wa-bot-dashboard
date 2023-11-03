import React from "react";
import MessagesScreen from "./ChatViewContainer";
import { StyledChatContentScreen } from "./index.styled";

const ChatContent: React.FC = () => {
  return (
    <>
      {
        <StyledChatContentScreen>
          <MessagesScreen />
        </StyledChatContentScreen>
      }
    </>
  );
};
export default ChatContent;
