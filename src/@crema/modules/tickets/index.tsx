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
const currentDate = dayjs();

const convertNumber = (value): number => {
  return value === "" || value === undefined ? 0 : parseInt(value, 10);
};

const Tickets: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [rangeValue, setRangeValue] = useState([currentDate, currentDate]);
  const [selectedDepartement, setSelectedDepartement] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const {
    tickets,
    isLoadingTicket,
    categoriesFilter,
    departmentFilter,
    ticketsTemp,
    branchesFilter,
  } = useAppSelector(({ ticket }) => ticket);

  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    data: undefined,
  });

  const { messages } = useIntl();

  const filterCategoryByDepartement = categoriesFilter.filter((category) => {
    if (selectedDepartement !== "" && selectedDepartement !== undefined) {
      const getDepartment = departmentFilter.filter(
        (data) => data.id === selectedDepartement
      );

      return category.departmentCode === getDepartment[0]?.code;
    } else {
      return true;
    }
  });

  const handleCancel = () => {
    setModalData({
      isOpen: false,
      data: undefined,
    });
  };

  const handleStatusChange = (value) => {
    setRangeValue(null);

    let filterStatus;
    switch (value) {
      case "all":
        filterStatus = tickets.filter(
          (ticket) =>
            ticket.status === "OPEN" ||
            ticket.status === "PENDING" ||
            ticket.status === "CLOSED" ||
            ticket.category.id === convertNumber(selectedCategory) ||
            ticket.department.id === convertNumber(selectedDepartement) ||
            ticket.branch.id === convertNumber(selectedBranch)
        );
        dispatch({
          type: "SET_TICKETS",
          payload: filterStatus,
        });
        break;
      case "OPEN":
      case "PENDING":
      case "CLOSED":
        filterStatus = tickets.filter(
          (ticket) =>
            ticket.status === value ||
            ticket.category.id === convertNumber(selectedCategory) ||
            ticket.department.id === convertNumber(selectedDepartement) ||
            ticket.branch.id === convertNumber(selectedBranch)
        );
        dispatch({
          type: "SET_TICKETS",
          payload: filterStatus,
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getTicketList({ fromUpdate: false }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedDepartement !== "" && selectedDepartement !== undefined) {
      setSelectedCategory("");
      const filterDepartment = tickets.filter(
        (ticket) =>
          ticket.department.id === convertNumber(selectedDepartement) ||
          ticket.category.id === convertNumber(selectedCategory) ||
          ticket.branch.id === convertNumber(selectedBranch)
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
    if (selectedCategory !== "" && selectedCategory !== undefined) {
      const filterCategory = tickets.filter(
        (ticket) =>
          ticket.category.id === convertNumber(selectedCategory) ||
          ticket.department.id === convertNumber(selectedDepartement) ||
          ticket.branch.id === convertNumber(selectedBranch)
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
    if (selectedBranch !== "" && selectedBranch !== undefined) {
      const filterBranch = tickets.filter(
        (ticket) =>
          ticket.category.id === convertNumber(selectedCategory) ||
          ticket.department.id === convertNumber(selectedDepartement) ||
          ticket.branch.id === convertNumber(selectedBranch)
      );
      dispatch({
        type: "SET_TICKETS",
        payload: filterBranch,
      });
    } else if (selectedBranch === undefined) {
      dispatch({
        type: "SET_TICKETS",
        payload: tickets,
      });
    }
  }, [selectedBranch]);

  return (
    <>
      {isLoadingTicket ? (
        <AppCard>
          <StyledSkeleton active />
        </AppCard>
      ) : (
        <AppCard className="no-card-space-ltr-rtl">
          <Row gutter={8} wrap={false} style={{ paddingLeft: "16px" }}>
            <Col span={9}>
              <Row align={"middle"} wrap={false}>
                <p style={{ marginBottom: 0, marginRight: "8px" }}>Tanggal: </p>
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
              </Row>
            </Col>

            <Col span={6}>
              <Row align={"middle"} wrap={false}>
                <p style={{ marginBottom: 0, marginRight: "8px" }}>PT: </p>
                <Select
                  style={{ width: "70%" }}
                  dropdownMatchSelectWidth={false}
                  value={selectedBranch}
                  allowClear
                  options={branchesFilter.map((branch) => ({
                    label: branch.branchName,
                    value: branch.id,
                  }))}
                  onChange={(value) => {
                    setSelectedBranch(value);
                  }}
                  virtual={false}
                />
              </Row>
            </Col>
          </Row>

          <Row style={{ paddingLeft: "16px" }} gutter={8} wrap={false}>
            <Col span={6}>
              <Row align={"middle"} wrap={false}>
                <p style={{ marginBottom: 0, marginRight: "8px" }}>
                  Departemen:{" "}
                </p>
                <Select
                  style={{ width: "70%" }}
                  dropdownMatchSelectWidth={false}
                  value={selectedDepartement}
                  allowClear
                  options={departmentFilter.map((department) => ({
                    label: department.name,
                    value: department.id,
                  }))}
                  onChange={(value) => {
                    setSelectedDepartement(value);
                  }}
                  virtual={false}
                />
              </Row>
            </Col>

            <Col span={6}>
              <Row align={"middle"} wrap={false}>
                <p style={{ marginBottom: 0, marginRight: "8px" }}>
                  Kategori:{" "}
                </p>
                <Select
                  style={{ width: "80%" }}
                  virtual={false}
                  dropdownMatchSelectWidth={false}
                  value={selectedCategory}
                  allowClear
                  options={filterCategoryByDepartement.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  onChange={(value) => {
                    setSelectedCategory(value);
                  }}
                />
              </Row>
            </Col>

            <Col span={4}>
              <Row align={"middle"} wrap={false}>
                <p style={{ marginBottom: 0, marginRight: "8px" }}>Status :</p>
                <Select
                  style={{ width: "60%" }}
                  dropdownMatchSelectWidth={false}
                  virtual={false}
                  onChange={handleStatusChange}
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
              </Row>
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
                      branchId: data.branch.id,
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
