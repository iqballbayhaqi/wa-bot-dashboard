import AppLoader from "@crema/components/AppLoader";
import { BlogContent } from "@crema/modules/extraPages/Blog";
import { isEmptyObject } from "@crema/helpers/ApiHelper";
import AppAnimate from "@crema/components/AppAnimate";
import { getBlogList } from "../../../toolkit/actions";
import { useAppSelector, useAppDispatch } from "../../../toolkit/hooks";
import { useEffect } from "react";

const Blogs = () => {
  const blogLists = useAppSelector(({ blogs }) => blogs.blogLists);
  const { loading } = useAppSelector(({ common }) => common);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBlogList());
  }, [dispatch]);

  return loading ? (
    <AppLoader />
  ) : !isEmptyObject(blogLists.blogSidebar) ? (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <BlogContent
        blogSidebar={blogLists.blogSidebar}
        blogContent={blogLists.blogContent}
      />
    </AppAnimate>
  ) : null;
};
export default Blogs;
