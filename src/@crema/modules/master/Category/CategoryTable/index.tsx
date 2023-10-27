import React, { useMemo } from "react";
import { StyledMasterTable } from "../../index.styled";
import { ColumnsType } from "antd/es/table";
import AppMenu from "@crema/components/AppMenu";
import { CategoryDataType } from "@crema/types/models/master";

const options: string[] = ["common.actionUpdate", "common.actionDelete"];

type MasterCategoryTableProps = {
  categoryData: CategoryDataType[];
  onHandleAction: (action: string, data: CategoryDataType) => void;
};

const MasterCategoryTable: React.FC<MasterCategoryTableProps> = ({
  categoryData,
  onHandleAction,
}) => {
  const columns: ColumnsType<CategoryDataType> = useMemo(
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
        title: "Nama Kategori",
        dataIndex: "categoryName",
        key: "categoryName",
        align: "center",
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
      data={categoryData}
      columns={columns}
    />
  );
};

export default MasterCategoryTable;
