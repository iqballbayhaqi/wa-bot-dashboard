import React, { useEffect } from "react";
import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import AppPageMeta from "@crema/components/AppPageMeta";
import {
  StyledAppRowContainer,
  StyledWallLeftSidebar,
  StyledWallMainContent,
  StyledWallRightSidebar,
  StyledWallScrollBar,
} from "./index.styled";
import { useAppSelector, useAppDispatch } from "../../../toolkit/hooks";
import { onGetWallData } from "../../../toolkit/actions";
import {
  About,
  FriendRequests,
  Photos,
  RecentNews,
  Suggestions,
  SuggestTeam,
  VideoCall,
  Stories,
  WhatsHappen,
  WhoToFollow,
} from "@crema/modules/apps/Wall";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import { isEmptyObject } from "@crema/helpers/ApiHelper";

const Wall = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetWallData());
  }, [dispatch]);

  const wallData = useAppSelector(({ wall }) => wall.wallData);
  const { messages } = useIntl();

  return (
    <AppsContainer
      title={messages["sidebar.apps.wall"] as string}
      cardStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
      fullView
    >
      <AppPageMeta title="Wall App" />
      {!isEmptyObject(wallData) && (
        <StyledAppRowContainer
          style={{
            height: "calc(100% - 32px)",
            padding: 8,
          }}
        >
          <StyledWallLeftSidebar xs={24} md={6} xl={6} xxl={6}>
          <StyledWallScrollBar style={{height: 'calc(100vh - 160px)'}}>
              <div>
                <VideoCall data={wallData?.videoCall} />
                <About about={wallData?.about} />
                <SuggestTeam data={wallData?.suggestTeam} />
                <Photos photos={wallData?.photos} />
                <Suggestions suggestions={wallData?.suggestions} />
              </div>
            </StyledWallScrollBar>
          </StyledWallLeftSidebar>
          <StyledWallMainContent xs={24} md={12} xl={12} xxl={12}>
          <StyledWallScrollBar style={{height: 'calc(100vh - 160px)'}}>
              <div>
                <CreatePost wallData={wallData} />
                <PostsList wallData={wallData} />
              </div>
            </StyledWallScrollBar>
          </StyledWallMainContent>
          <StyledWallRightSidebar xs={24} md={6} xl={6} xxl={6}>
          <StyledWallScrollBar style={{height: 'calc(100vh - 160px)'}}>
              <div>
                <Stories stories={wallData?.stories} />
                <WhatsHappen whatsHappen={wallData?.whatsHappen} />
                <WhoToFollow whoToFollow={wallData?.whoToFollow} />
                <FriendRequests friendRequests={wallData?.friendRequests} />
                <RecentNews recentNews={wallData?.recentNews} />
              </div>
            </StyledWallScrollBar>
          </StyledWallRightSidebar>
        </StyledAppRowContainer>
      )}
    </AppsContainer>
  );
};

export default Wall;
