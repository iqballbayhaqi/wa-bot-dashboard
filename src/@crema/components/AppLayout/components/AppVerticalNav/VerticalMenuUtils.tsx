import Link from "next/link";
import React from "react";
import { MessageFormatElement } from "react-intl";
import { RouterConfigData } from "@crema/types/models/Apps";
import { Badge } from "antd";

const renderMenuItemChildren = (
  item: RouterConfigData,
  messages: Record<string, string> | Record<string, MessageFormatElement[]>,
  count?: number
) => {
  const { icon, messageId, path } = item;

  if (path && path.includes("/"))
    return {
      key: item.id,
      icon:
        icon &&
        (React.isValidElement(icon) ? (
          <span className="ant-menu-item-icon">
            {item.id === "chat" ? (
              <Badge count={count} size="small">
                {icon}
              </Badge>
            ) : (
              icon
            )}
          </span>
        ) : (
          <span className="ant-menu-item-icon" />
        )),
      label: (
        <Link href={path}>
          <span data-testid={messageId.toLowerCase + "-nav"}>
            {messages[messageId] as string}
          </span>
        </Link>
      ),
    };
  else {
    return {
      key: item.id,
      icon:
        icon &&
        (React.isValidElement(icon) ? (
          <span className="ant-menu-item-icon">{icon}</span>
        ) : (
          <span className="ant-menu-item-icon" />
        )),
      label: (
        <span data-testid={messageId.toLowerCase + "-nav"}>
          {messages[messageId] as string}
        </span>
      ),
    };
  }
};

const renderMenuItem: any = (
  item: RouterConfigData,
  messages: Record<string, string> | Record<string, MessageFormatElement[]>
) => {
  return item.type === "collapse"
    ? {
        ...renderMenuItemChildren(item, messages),
        children: item.children?.map((item) => renderMenuItem(item, messages)),
        type: "collapse",
      }
    : {
        ...renderMenuItemChildren(item, messages),
      };
};

const renderMenu = (
  item: RouterConfigData,
  messages: Record<string, string> | Record<string, MessageFormatElement[]>,
  count: number
) => {
  return item.type === "group" || item.type === "collapse"
    ? {
        ...renderMenuItemChildren(item, messages),
        children: item.children?.map((item) => renderMenuItem(item, messages)),
        type: item.type,
      }
    : {
        // exact: item.exact,
        ...renderMenuItemChildren(item, messages, count),
      };
};

export const getRouteMenus = (
  routesConfig: RouterConfigData[],
  messages: Record<string, string> | Record<string, MessageFormatElement[]>,
  count: number
) => {
  return routesConfig.map((route) => renderMenu(route, messages, count));
};
