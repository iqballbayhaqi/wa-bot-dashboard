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
import { filterDatesInRange } from "@crema/helpers/DateHelper";
import dayjs from "dayjs";

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

const dateFormat = "YYYY/MM/DD";

const convertNumber = (value): number => {
  return value === "" ? 0 : parseInt(value, 10);
};

const Tickets: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [rangeValue, setRangeValue] = useState(null);
  const [selectedDepartement, setSelectedDepartement] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const {
    tickets,
    isLoadingTicket,
    categoriesFilter,
    departmentFilter,
    ticketsTemp,
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

  useEffect(() => {
    if (selectedDepartement !== "" && selectedDepartement !== undefined) {
      setRangeValue(null);
      setSelectedCategory("");
      const filterDepartment = tickets.filter(
        (ticket) => ticket.department.id === convertNumber(selectedDepartement)
      );
      dispatch({
        type: "SET_TICKETS",
        payload: filterDepartment,
      });
    } else if (selectedDepartement === undefined) {
      dispatch({
        type: "SET_TICKETS",
        payload: tickets,
      });
    }
  }, [selectedDepartement]);

  useEffect(() => {
    console.log(selectedCategory);
    if (selectedCategory !== "" && selectedCategory !== undefined) {
      setRangeValue(null);
      setSelectedDepartement("");
      const filterCategory = tickets.filter(
        (ticket) => ticket.category.id === convertNumber(selectedCategory)
      );
      dispatch({
        type: "SET_TICKETS",
        payload: filterCategory,
      });
    } else if (selectedCategory === undefined) {
      dispatch({
        type: "SET_TICKETS",
        payload: tickets,
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    setRangeValue(null);
    setSelectedDepartement("");
    setSelectedCategory("");

    let filterStatus;
    switch (selectedStatus) {
      case "all":
        dispatch({
          type: "SET_TICKETS",
          payload: tickets,
        });
        break;
      case "OPEN":
        filterStatus = tickets.filter(
          (ticket) => ticket.status === selectedStatus
        );
        dispatch({
          type: "SET_TICKETS",
          payload: filterStatus,
        });
        break;
      case "PENDING":
        filterStatus = tickets.filter(
          (ticket) => ticket.status === selectedStatus
        );
        dispatch({
          type: "SET_TICKETS",
          payload: filterStatus,
        });
        break;
      case "CLOSED":
        filterStatus = tickets.filter(
          (ticket) => ticket.status === selectedStatus
        );
        dispatch({
          type: "SET_TICKETS",
          payload: filterStatus,
        });
        break;

      default:
        break;
    }
  }, [selectedStatus]);

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
                  allowClear
                  value={rangeValue}
                  placeholder={["Tanggal Awal", "Tanggal Akhir"]}
                  style={{ width: "100%" }}
                  onChange={(date, dateString) => {
                    const filterTicket = filterDatesInRange(
                      tickets,
                      dateString[0],
                      dateString[1]
                    );

                    if (
                      date &&
                      tickets.length > 0 &&
                      dateString[0] !== "" &&
                      dateString[1] !== ""
                    ) {
                      setRangeValue([
                        dayjs(dateString[0], dateFormat),
                        dayjs(dateString[1], dateFormat),
                      ]);
                      dispatch({
                        type: "SET_TICKETS",
                        payload: filterTicket,
                      });
                    } else if (
                      (tickets.length > 0 &&
                        dateString[0] === "" &&
                        dateString[1] === "") ||
                      date === null
                    ) {
                      dispatch({
                        type: "SET_TICKETS",
                        payload: tickets,
                      });
                      setRangeValue(date);
                    }
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={5}>
              <Form.Item label="Departemen">
                <Select
                  value={selectedDepartement}
                  allowClear
                  options={departmentFilter}
                  onChange={(value) => {
                    setSelectedDepartement(value);
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={5}>
              <Form.Item label="Kategori">
                <Select
                  value={selectedCategory}
                  allowClear
                  options={categoriesFilter}
                  onChange={(value) => {
                    setSelectedCategory(value);
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Status">
                <Select
                  onChange={(value) => setSelectedStatus(value)}
                  value={selectedStatus}
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
                  apiData: ticketsTemp,
                  fileName: "chat-file",
                });
              }}
            >
              Export To Excel
            </Button>
          </Row>

          <TicketTable
            ticketData={ticketsTemp}
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
