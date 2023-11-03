import React, { useMemo } from "react";
import { StyledMasterTable } from "../index.styled";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import AppMenu from "@crema/components/AppMenu";
import { DepartementDataType } from "@crema/types/models/master";
import { Row } from "antd";
import { TicketDataType } from "@crema/types/models/tickets";

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
        // ellipsis: true,
      },
      {
        title: "Waktu Berakhir",
        dataIndex: "endTime",
        key: "endTime",
        align: "center",
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
