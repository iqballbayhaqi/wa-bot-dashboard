import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { Button, Input } from "antd";
import { StyledAddNewMessage, StyledNewMessageAction } from "../index.styled";
import { useAppDispatch } from "toolkit/hooks";

type AddNewMessageProps = {
  onSendMessage: (message: string) => void;
  currentMessage: string | undefined;
};

const AddNewMessage: React.FC<AddNewMessageProps> = ({
  onSendMessage,
  currentMessage = "",
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: "COPY_MESSAGE",
      payload: currentMessage,
    });
  }, [currentMessage]);

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickSendMessage();
    }
  };

  const onClickSendMessage = () => {
    if (currentMessage) {
      onSendMessage(currentMessage);
      dispatch({
        type: "COPY_MESSAGE",
        payload: "",
      });
    }
  };

  const { messages } = useIntl();

  return (
    <StyledAddNewMessage>
      <Input
        placeholder={messages["ticket.sendMessagePlaceholder"] as string}
        value={currentMessage}
        onChange={(event) => {
          if (event.target.value !== "\n")
            dispatch({
              type: "COPY_MESSAGE",
              payload: event.target.value,
            });
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
