import React, { useMemo } from "react";
import { StyledMasterTable } from "../../index.styled";
import { ColumnsType } from "antd/es/table";
import AppMenu from "@crema/components/AppMenu";
import { DepartementDataType } from "@crema/types/models/master";

const options: string[] = ["common.actionUpdate", "common.actionDelete"];

type MasterDepartementTableProps = {
  departementData: DepartementDataType[];
  onHandleAction: (action: string, data: DepartementDataType) => void;
};

const MasterDepartementTable: React.FC<MasterDepartementTableProps> = ({
  departementData,
  onHandleAction,
}) => {
  const columns: ColumnsType<DepartementDataType> = useMemo(
    () => [
      {
        title: "No.",
        dataIndex: `no`,
        key: "no",
        width: "10%",
      },
      {
        title: "Kode Departemen",
        dataIndex: "departmentCode",
        key: "departmentCode",
        width: "30%",
        align: "center",
      },
      {
        title: "Nama Departemen",
        dataIndex: "departmentName",
        key: "departmentName",
        align: "center",
        width: "30%",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        width: "10%",
        align: "center",
        render: (_, record) => (
          <AppMenu
            options={options}
            onClick={({ key: actionType }) => {
              onHandleAction(actionType, record);
            }}
          />
        ),
      },
    ],
    []
  );

  return (
    <StyledMasterTable
      scroll={{ y: 470 }}
      data={departementData}
      columns={columns}
    />
  );
};

export default MasterDepartementTable;
