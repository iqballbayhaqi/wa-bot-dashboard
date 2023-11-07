import { BsChatDots } from "react-icons/bs";
import {
  RiBroadcastLine,
  RiDashboard3Line,
  RiDatabaseLine,
  RiOrganizationChart,
} from "react-icons/ri";

const routesConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    messageId: "sidebar.dashboard",
    icon: <RiDashboard3Line />,
    path: "/dashboard",
  },
  {
    id: "master",
    title: "Master",
    messageId: "sidebar.master",
    icon: <RiDatabaseLine />,
    type: "collapse",
    children: [
      {
        id: "departement&category",
        title: "Departement & Category",
        messageId: "sidebar.master.departmentCategory",
        icon: <RiOrganizationChart />,
        path: "/master/departement-category",
      },
    ],
  },
  {
    id: "chat",
    title: "List Percakapan",
    icon: <BsChatDots />,
    messageId: "sidebar.chat",
    path: "/chat",
  },
  {
    id: "broadcast",
    title: "Broadcasting",
    icon: <RiBroadcastLine />,
    messageId: "sidebar.broadcast",
    path: "/broadcast",
  },
];
export default routesConfig;
