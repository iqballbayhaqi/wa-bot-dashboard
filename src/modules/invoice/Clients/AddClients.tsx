import React from "react";
import { useRouter } from "next/router";
import { AddClient } from "@crema/modules/invoice";
import { onAddClient } from "../../../toolkit/actions";
import { useAppDispatch } from "../../../toolkit/hooks";
import { StyledTypographyWrapper } from "../index.styled";
import { ClientType } from "@crema/types/models/invoice";

const AddClients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSave = (client: ClientType) => {
    dispatch(onAddClient(client));
    router.push("/invoice/clients");
  };

  return (
    <StyledTypographyWrapper>
      <AddClient onSave={onSave} />
    </StyledTypographyWrapper>
  );
};

export default AddClients;
