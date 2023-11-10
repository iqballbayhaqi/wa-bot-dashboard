import { PlusOutlined } from "@ant-design/icons";

import AppTableContainer from "@crema/components/AppTableContainer";
import AppCard from "@crema/components/AppCard";
import { Button, Modal, Skeleton } from "antd";

import styled from "styled-components";

export const StyledMasterInfoContent = styled.div`
  flex: 1;

  & h3 {
    margin-bottom: 0;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 13px;
  }
`;

export const StyledMasterTable = styled(AppTableContainer)`
  & .ant-table-thead > tr > th {
    border-bottom: 0 none;
    font-size: 13px;
    padding: 8px;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    background-color: transparent;
    color: ${({ theme }) => theme.palette.text.primary};

    &:first-child {
      padding-left: 20px;

      [dir="rtl"] & {
        padding-left: 0;
        padding-right: 20px;
      }
    }

    &:last-child {
      padding-right: 20px;

      [dir="rtl"] & {
        padding-right: 0;
        padding-left: 20px;
      }
    }
  }

  & .ant-table-tbody > tr > td {
    border-bottom: 0 none;
    font-size: 13px;
    padding: 6px 8px;

    &:first-child {
      padding-left: 20px;

      [dir="rtl"] & {
        padding-left: 0;
        padding-right: 20px;
      }
    }

    &:last-child {
      padding-right: 20px;

      [dir="rtl"] & {
        padding-right: 0;
        padding-left: 20px;
      }
    }
  }
`;

export const StyledPlusOutlined = styled(PlusOutlined)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 16px;
`;

export const StyledAddModal = styled(Modal)`
  position: relative;
`;

export const StyledBtn = styled(Button)`
  width: 94px;

  &[disabled] {
    background-color: #ddd !important;
    border-color: #ddd !important;
    color: #888;
  }
`;

export const StyledAddCard = styled(AppCard)`
  box-shadow: none !important;
  background-color: #ffffff;
  padding-top: 8px;
  & .ant-card-body {
    padding: 0;
  }
`;

export const StyledSkeleton = styled(Skeleton)`
  padding: 16px;
`;
