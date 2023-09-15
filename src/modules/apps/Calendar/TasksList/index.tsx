import React, { useEffect, useState } from "react";
import AddNewTask from "../AddNewTask";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import { TaskCalender } from "@crema/modules/apps/Calendar";
import {
  onGetCalPriorityList,
  onGetCalStatusList,
  onGetCalTaskList,
  onUpdateSelectedCalTask,
} from "../../../../toolkit/actions";
import { useAppDispatch, useAppSelector } from "../../../../toolkit/hooks";
import { FilterProps } from "..";
import { useRouter } from "next/router";

type Props = {
  filterData: FilterProps;
};

const TasksList = ({ filterData }: Props) => {
  const dispatch = useAppDispatch();
  const [filterText, onSetFilterText] = useState("");
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [page, setPage] = useState(0);

  const taskLists = useAppSelector(({ calendarApp }) => calendarApp.taskList);

  const router = useRouter();
  const { all } = router.query;

  useEffect(() => {
    setPage(0);
    dispatch(onGetCalPriorityList());
    dispatch(onGetCalStatusList());

    dispatch(onGetCalTaskList(all[0], all[1], page));
  }, [dispatch, page, all]);

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onGetFilteredItems = () => {
    if (!taskLists) return [];
    if (filterText === "") {
      return getFilterData().data;
    } else {
      return getFilterData().data.filter((task) =>
        task.title.toUpperCase().includes(filterText.toUpperCase())
      );
    }
  };

  const onUpdateTask = (task: any) => {
    dispatch(onUpdateSelectedCalTask(task));
  };

  const getFilterData = () => {
    if (taskLists) {
      const data = taskLists.filter((task) => {
        let status = true;
        if (filterData.status.length > 0) {
          status = filterData.status.includes(task.status);
        }
        let priority = true;
        if (filterData.priority.length > 0) {
          priority = filterData.priority.includes(task.priority.id);
        }
        return status && priority;
      });
      return {
        data,
        count: data.length,
      };
    }
    return { data: [], count: 0 };
  };

  const list = onGetFilteredItems();

  return (
    <>
      <AppsContent fullView>
        <TaskCalender
          taskList={list}
          onUpdateTask={onUpdateTask}
          onSetFilterText={onSetFilterText}
        />
      </AppsContent>

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};

export default TasksList;
