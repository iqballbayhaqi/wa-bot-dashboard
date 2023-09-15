import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MailContentHeader from "./MailContentHeader";
import MailListItem from "./MailListItem";
import AppsPagination from "@crema/components/AppsPagination";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsFooter from "@crema/components/AppsContainer/AppsFooter";
import AppList from "@crema/components/AppList";
import ListEmptyResult from "@crema/components/AppList/ListEmptyResult";
import EmailListSkeleton from "@crema/components/AppSkeleton/EmailListSkeleton";
import {
  StyledAppsMailFooter,
  StyledMailListDesktop,
  StyledMailListMobile,
} from "./index.styled";
import { MailListItemMobile } from "@crema/modules/apps/Mail";
import type { LabelObjType, MailObjType } from "@crema/types/models/apps/Mail";
import {
  onGetMailList,
  onUpdateMailStarredStatus,
} from "../../../../toolkit/actions";
import { useAppSelector, useAppDispatch } from "../../../../toolkit/hooks";

const MailsList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { asPath } = router;
  const { all } = router.query;

  const [filterText, onSetFilterText] = useState("");

  const [checkedMails, setCheckedMails] = useState<number[]>([]);

  const mailList = useAppSelector(({ mailApp }) => mailApp.mailList);
  const totalMails = useAppSelector(({ mailApp }) => mailApp.totalMails);

  const labelList = useAppSelector(({ mailApp }) => mailApp.labelList);

  const [page, setPage] = useState(0);

  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    setPage(0);
  }, [asPath]);

  useEffect(() => {
    setPage(0);
    dispatch(onGetMailList(all[0], all[1], page));
  }, [dispatch, all, page]);

  const onChangeCheckedMails = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedMails(checkedMails.concat(id));
    } else {
      setCheckedMails(checkedMails.filter((mailId) => mailId !== id));
    }
  };

  const onViewMailDetail = (mail: MailObjType) => {
    if (all[0] === "label")
      router.push(`/apps/mail/label/${all[0]}/${mail.id}`);
    if (all[0] === "folder") router.push(`/apps/mail/${all[0]}/${mail.id}`);
  };

  const path = router.asPath.split("/");
  const onChangeStarred = (checked: boolean, mail: MailObjType) => {
    dispatch(
      onUpdateMailStarredStatus([mail.id], checked, path[path.length - 1])
    );
  };

  const onPageChange = (value: number) => {
    setPage(value);
  };

  const onGetFilteredMails = () => {
    if (filterText === "") {
      return mailList;
    } else {
      return mailList.filter(
        (mail) =>
          mail?.subject?.toLowerCase().includes(filterText.toLowerCase()) ||
          mail?.detail?.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  };

  const list = onGetFilteredMails();

  return (
    <>
      <AppsHeader>
        <MailContentHeader
          checkedMails={checkedMails}
          setCheckedMails={setCheckedMails}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          page={page}
          path={path}
          onPageChange={onPageChange}
        />
      </AppsHeader>
      <AppsContent>
        <StyledMailListDesktop>
          <AppList
            data={list}
            ListEmptyComponent={
              <ListEmptyResult
                loading={loading}
                placeholder={<EmailListSkeleton />}
              />
            }
            renderItem={(mail) => (
              <MailListItem
                mail={mail}
                key={mail.id}
                labelList={labelList}
                onChangeCheckedMails={onChangeCheckedMails}
                checkedMails={checkedMails}
                onViewMailDetail={onViewMailDetail}
                onChangeStarred={onChangeStarred}
              />
            )}
          />
        </StyledMailListDesktop>
        <StyledMailListMobile>
          <AppList
            data={list}
            ListEmptyComponent={
              <ListEmptyResult
                loading={loading}
                placeholder={<EmailListSkeleton />}
              />
            }
            renderItem={(mail) => (
              <MailListItemMobile
                mail={mail}
                key={mail.id}
                labelList={labelList}
                onViewMailDetail={onViewMailDetail}
                onChangeStarred={onChangeStarred}
                checkedMails={checkedMails}
                onChangeCheckedMails={onChangeCheckedMails}
              />
            )}
          />
        </StyledMailListMobile>
      </AppsContent>
      {list?.length > 0 ? (
        <StyledAppsMailFooter>
          <AppsFooter>
            <AppsPagination
              count={totalMails}
              page={page}
              onChange={(data) => onPageChange(data)}
            />
          </AppsFooter>
        </StyledAppsMailFooter>
      ) : null}
    </>
  );
};

export default MailsList;
