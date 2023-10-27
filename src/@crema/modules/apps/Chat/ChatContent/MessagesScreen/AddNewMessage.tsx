import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { Button, Input } from "antd";
import { StyledAddNewMessage, StyledNewMessageAction } from "../index.styled";

type AddNewMessageProps = {
  onSendMessage: (message: string) => void;
  currentMessage: string | undefined;
};

const AddNewMessage: React.FC<AddNewMessageProps> = ({
  onSendMessage,
  currentMessage = "",
}) => {
  const [message, setMessage] = useState(currentMessage);

  useEffect(() => {
    setMessage(currentMessage);
  }, [currentMessage]);

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickSendMessage();
    }
  };

  const onClickSendMessage = () => {
    if (message) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const { messages } = useIntl();

  return (
    <StyledAddNewMessage>
      <Input
        placeholder={messages["ticket.sendMessagePlaceholder"] as string}
        value={message}
        onChange={(event) => {
          if (event.target.value !== "\n") setMessage(event.target.value);
        }}
        onKeyDown={onKeydown}
      />

      <StyledNewMessageAction>
        <Button className="message-btn" onClick={onClickSendMessage}>
          <SendOutlined />
        </Button>
      </StyledNewMessageAction>
    </StyledAddNewMessage>
  );
};

export default AddNewMessage;
