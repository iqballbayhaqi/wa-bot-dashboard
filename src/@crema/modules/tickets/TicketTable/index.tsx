import AppMenu from "@crema/components/AppMenu";
import { TicketDataType } from "@crema/types/models/tickets";
import { Row } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
// import "moment/locale/id";
import React, { useMemo } from "react";
import { StyledMasterTable } from "../index.styled";

const options: string[] = ["common.actionDetail", "common.actionMove"];

type TicketTableProps = {
  ticketData: Array<TicketDataType>;
  onHandleAction: (action: string, data: TicketDataType) => void;
};

const TikcetsTable: React.FC<TicketTableProps> = ({
  ticketData,
  onHandleAction,
}) => {
  const columns: ColumnsType<TicketDataType> = useMemo(
    () => [
      {
        title: "No. Ticket",
        dataIndex: `ticketNumber`,
        key: "ticketNumber",
        align: "center",
      },
      {
        title: "No Telepon",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        align: "center",
      },
      {
        title: "Waktu Mulai",
        dataIndex: "startTime",
        key: "startTime",
        align: "center",
        render: (_, record) => {
          moment.locale("id");
          return (
            <p>
              {moment.utc(record.startTime).format("dddd, D MMMM YYYY, HH:mm")}
            </p>
          );
        },
      },
      {
        title: "Waktu Berakhir",
        dataIndex: "endTime",
        key: "endTime",
        align: "center",
        render: (_, record) => {
          moment.locale("id");
          return (
            <p>
              {moment.utc(record.endTime).format("dddd, D MMMM YYYY, HH:mm")}
            </p>
          );
        },
        // ellipsis: true,
      },
      {
        title: "Permasalahan",
        dataIndex: "issue",
        key: "issue",
        align: "center",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
      },
      {
        title: "Solved",
        dataIndex: "isUnsolved",
        key: "isUnsolved",
        align: "center",
      },
      {
        title: "PT",
        dataIndex: "branch",
        key: "branch",
        align: "center",
        render: (_, record) => <p>{record.branch.name}</p>,
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department",
        align: "center",
        render: (_, record) => <p>{record.department.name}</p>,
      },
      {
        title: "Kategori",
        dataIndex: "category",
        key: "category",
        align: "center",
        render: (_, record) => <p>{record.category.name}</p>,
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        align: "center",
        render: (_, record) => (
          <Row
            justify="center"
            style={{ backgroundColor: "white", justifyContent: "center" }}
          >
            <AppMenu
              options={options}
              onClick={({ key: actionType }) => {
                onHandleAction(actionType, record);
              }}
            />
          </Row>
        ),
      },
    ],
    []
  );

  return (
    <StyledMasterTable
      scroll={{ y: 470 }}
      data={ticketData}
      columns={columns}
    />
  );
};

export default TikcetsTable;
