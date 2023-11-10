import AppCard from "@crema/components/AppCard";
import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { getTicketList } from "toolkit/actions";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";
import AddEditModal from "./AddEditModal";
import TicketTable from "./TicketTable";
import { StyledSkeleton } from "./index.styled";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import { exportToExcel } from "@crema/helpers/FileHelper";

const { RangePicker } = DatePicker;

type ModalData = {
  isOpen: boolean;
  data?: {
    id: number;
    departmentId: string | number;
    categoryId: string | number;
    issue: string;
    ticketNumber: string;
  };
};

const Tickets: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    tickets,
    isLoadingTicket,
    dateFilter,
    categoriesFilter,
    departmentFilter,
  } = useAppSelector(({ ticket }) => ticket);

  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    data: undefined,
  });

  const { messages } = useIntl();

  const handleCancel = () => {
    setModalData({
      isOpen: false,
      data: undefined,
    });
  };

  useEffect(() => {
    dispatch(getTicketList());
  }, [dispatch]);

  return (
    <>
      {isLoadingTicket ? (
        <AppCard>
          <StyledSkeleton active />
        </AppCard>
      ) : (
        <AppCard className="no-card-space-ltr-rtl">
          <Row style={{ margin: "0 8px" }} gutter={8}>
            <Col span={8}>
              <Form.Item label="Tanggal">
                <RangePicker
                  placeholder={["Tanggal Awal", "Tanggal Akhir"]}
                  style={{ width: "100%" }}
                  onCalendarChange={(date) => {
                    console.log(date);
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={5}>
              <Form.Item label="Departemen">
                <Select options={departmentFilter} />
              </Form.Item>
            </Col>

            <Col span={5}>
              <Form.Item label="Kategori">
                <Select options={categoriesFilter} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Status">
                <Select
                  defaultValue={"all"}
                  options={[
                    {
                      label: "all",
                      value: "all",
                    },
                    {
                      label: "open",
                      value: "OPEN",
                    },
                    {
                      label: "pending",
                      value: "PENDING",
                    },
                    {
                      label: "closed",
                      value: "CLOSED",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"end"}>
            <Button
              onClick={() => {
                exportToExcel({
                  apiData: tickets,
                  fileName: "chat-file",
                });
              }}
            >
              Export To Excel
            </Button>
          </Row>

          <TicketTable
            ticketData={tickets}
            onHandleAction={(action, data) => {
              switch (action) {
                case messages["common.actionDetail"]:
                  router.push(`/chat/${data.id}`);
                  break;
                case messages["common.actionMove"]:
                  setModalData({
                    isOpen: true,
                    data: {
                      id: data.id,
                      departmentId: data.department.id,
                      categoryId: data.category.id,
                      issue: data.issue,
                      ticketNumber: data.ticketNumber,
                    },
                  });
                  break;
              }
            }}
          />
        </AppCard>
      )}

      {modalData.isOpen ? (
        <AddEditModal
          data={modalData.data}
          isModalVisible={modalData.isOpen}
          handleCancel={handleCancel}
        />
      ) : null}
    </>
  );
};

export default Tickets;
