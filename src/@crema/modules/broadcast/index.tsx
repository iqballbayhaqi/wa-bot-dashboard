import AppCard from "@crema/components/AppCard";
import React, { useState } from "react";
import BroadcastTable from "./BroadcastTable";
import { StyledSkeleton } from "./index.styled";
import { Button, Row } from "antd";
import { useRouter } from "next/router";
import CreateBroadcastModal from "./CreateBroadcast";
import { useIntl } from "react-intl";

const Broadcast: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { messages } = useIntl();
  return (
    <>
      {false ? (
        <AppCard>
          <StyledSkeleton active />
        </AppCard>
      ) : (
        <AppCard className="no-card-space-ltr-rtl">
          <Row justify={"end"} style={{ margin: "8px 8px" }}>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
            >
              Buat Broadcast
            </Button>
          </Row>
          <BroadcastTable
            broadcastData={[]}
            onHandleAction={(action, data) => {
              switch (action) {
                case messages["common.actionDetail"]:
                  console.log("data", data);
                  break;
              }
            }}
          />
        </AppCard>
      )}

      {showModal && (
        <CreateBroadcastModal
          isModalVisible={showModal}
          handleCancel={() => setShowModal(false)}
          data={null}
        />
      )}
    </>
  );
};

export default Broadcast;
