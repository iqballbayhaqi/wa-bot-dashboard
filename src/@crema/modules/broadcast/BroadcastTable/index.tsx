import AppMenu from "@crema/components/AppMenu";
import { BroadcastDataType } from "@crema/types/models/broadcast";
import { Row } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useMemo } from "react";
import { StyledMasterTable } from "../index.styled";

const options: string[] = ["common.actionDetail"];

type BroadcastTableProps = {
  broadcastData: BroadcastDataType[];
  onHandleAction: (action: string, data: BroadcastDataType) => void;
};

const BroadcastTable: React.FC<BroadcastTableProps> = ({
  broadcastData,
  onHandleAction,
}) => {
  const columns: ColumnsType<BroadcastDataType> = useMemo(
    () => [
      {
        title: "Judul",
        dataIndex: `title`,
        key: "title",
        align: "center",
      },
      {
        title: "Pesan",
        dataIndex: "message",
        key: "message",
        align: "center",
        ellipsis: true,
      },
      {
        title: "Waktu Dibuat",
        dataIndex: "createdAt",
        key: "createdAt",
        align: "center",
        render: (_, record) => {
          moment.locale("id");
          return (
            <p>
              {moment.utc(record.createdAt).format("dddd, D MMMM YYYY, HH:mm")}
            </p>
          );
        },
      },
      {
        title: "Total Pesan",
        dataIndex: "totalMessage",
        key: "totalMessage",
        align: "center",
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
      data={broadcastData}
      columns={columns}
    />
  );
};

export default BroadcastTable;
