import React, { useEffect, useState } from "react";
import TicketTable from "./TicketTable";
import AppCard from "@crema/components/AppCard";
import { useIntl } from "react-intl";
import { StyledSkeleton } from "./index.styled";
import AddEditModal from "./AddEditModal";
import { getMasterDepartementList, getTicketList } from "toolkit/actions";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";
import { useRouter } from "next/router";
import { Col, Form, Row, Select } from "antd";

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

  const { tickets, isLoadingTicket } = useAppSelector(({ ticket }) => ticket);

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
          <Form layout="inline" wrapperCol={{ span: 24 }}>
            <Form.Item label="Tanggal">
              <Select options={[]} />
            </Form.Item>

            <Form.Item label="Departemen">
              <Select options={[]} />
            </Form.Item>

            <Form.Item label="Kategori">
              <Select options={[]} />
            </Form.Item>

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
                    value: "open",
                  },
                  {
                    label: "pending",
                    value: "pending",
                  },
                  {
                    label: "closed",
                    value: "closed",
                  },
                ]}
              />
            </Form.Item>
          </Form>

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
