import React from "react";
import { Dropdown, MenuProps } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import { useIntl } from "react-intl";

interface AppMenuProps {
  options: string[];
  onClick?: MenuProps["onClick"];
}

const AppMenu = ({ options, onClick }: AppMenuProps) => {
  const { messages } = useIntl();
  const items =
    options.map((option) => {
      return {
        key: messages[option] as string,
        label: messages[option] as string,
      };
    }) ?? [];

  return (
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      <a
        className="ant-dropdown-link cr-dropdown-link"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <FiMoreVertical />
      </a>
    </Dropdown>
  );
};

export default AppMenu;
