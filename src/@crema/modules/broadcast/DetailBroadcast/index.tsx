import React, { useEffect } from "react";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { onGetDetailBroadcast } from "toolkit/actions/Broadcast";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";
import { StyledAddCard, StyledSkeleton } from "../index.styled";

const DetailBroadcast: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoadingDetailBroadcast, detailBroadcast } = useAppSelector(
    ({ broadcast }) => broadcast
  );

  useEffect(() => {
    dispatch(onGetDetailBroadcast(router.query.id));
  }, [dispatch, router.query.id]);

  return (
    <>
      <Button
        style={{ marginBottom: "16px" }}
        onClick={() => {
          router.back();
        }}
      >
        Kembali
      </Button>

      <StyledAddCard>
        {isLoadingDetailBroadcast ? (
          <StyledSkeleton active />
        ) : (
          <Form wrapperCol={{ span: 24 }}>
            <Form.Item label="Judul" labelCol={{ span: 1 }}>
              <Input readOnly value={"Kirim Broadcast"} />
            </Form.Item>

            <Form.Item label="Pesan" labelCol={{ span: 1 }}>
              <Input.TextArea value={detailBroadcast.message} rows={10} />
            </Form.Item>
          </Form>
        )}
      </StyledAddCard>
    </>
  );
};

export default DetailBroadcast;
