import React, { useEffect, useRef, useState } from "react";
import { getRouteMenus } from "./VerticalMenuUtils";
import clsx from "clsx";
import defaultConfig from "@crema/constants/defaultConfig";
import { useSidebarContext } from "@crema/context/AppContextProvider/SidebarContextProvider";
import { MenuStyle } from "@crema/constants/AppEnums";
import { StyledVerticalNav } from "./index.styled";
import { useRouter } from "next/router";
import { RouterConfigData } from "@crema/types/models/Apps";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";
import { getTicketCount } from "toolkit/actions";

type Props = {
  routesConfig: RouterConfigData[];
};

const AppVerticalNav: React.FC<Props> = ({ routesConfig }) => {
  const { menuStyle, sidebarColorSet } = useSidebarContext();
  const dispatch = useAppDispatch();
  const { ticketCount } = useAppSelector(({ ticket }) => ticket);
  const { pathname } = useRouter();
  const selectedKeys = pathname.substr(1).split("/");
  const [openKeys, setOpenKeys] = useState([selectedKeys[0]]);
  const timerIdRef = useRef(null);

  useEffect(() => {
    setOpenKeys([selectedKeys[selectedKeys.length - 2]]);
  }, []);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const { messages } = useIntl();

  useEffect(() => {
    const pollingCallback = () => {
      // Your polling logic here
      console.log("Polling...");
      dispatch(getTicketCount());

      // // Simulating an API failure in the polling callback
      // const shouldFail = Math.random() < 0.2; // Simulate 20% chance of API failure

      // if (shouldFail) {
      //   setIsPollingEnabled(false);
      //   console.log('Polling failed. Stopped polling.');
      // }
    };

    const startPolling = () => {
      // pollingCallback(); // To immediately start fetching data
      // Polling every 30 seconds
      timerIdRef.current = setInterval(pollingCallback, 5000);
    };

    const stopPolling = () => {
      clearInterval(timerIdRef.current);
    };

    startPolling();

    return () => {
      stopPolling();
    };
  }, []);

  return (
    <StyledVerticalNav
      theme={sidebarColorSet.mode}
      color={sidebarColorSet.sidebarMenuSelectedTextColor}
      mode="inline"
      className={clsx({
        "menu-rounded": menuStyle === MenuStyle.ROUNDED,
        "menu-rounded rounded-menu-reverse":
          menuStyle === MenuStyle.ROUNDED_REVERSE,
        "menu-rounded standard-menu": menuStyle === MenuStyle.STANDARD,
        "menu-rounded curved-menu": menuStyle === MenuStyle.CURVED_MENU,
        "bg-color-menu":
          sidebarColorSet.sidebarBgColor !==
          defaultConfig.sidebar.colorSet.sidebarBgColor,
      })}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[selectedKeys[selectedKeys.length - 1]]}
      defaultSelectedKeys={[selectedKeys[selectedKeys.length - 1]]}
      items={getRouteMenus(routesConfig, messages, ticketCount)}
    />
  );
};

export default AppVerticalNav;
