import mock from "../MockConfig";
import { masterCategoryData, masterDepartementData } from "../../fakedb/master";

let departmentList = masterDepartementData;

mock.onGet("/department").reply(() => {
  return [200, departmentList];
});

mock.onPost("/department").reply((config) => {
  const data = JSON.parse(config.data);

  const mappedData = {
    ...data,
    id: departmentList.length + 1,
    modifyStatus: "I",
    createdTime: "2023-10-10T21:22:43.560Z",
    createdBy: null,
    lastModifiedTime: "2023-10-10T21:22:43.560Z",
    lastModifiedBy: null,
    rowVersion: {
      type: "Buffer",
      data: [0, 0, 0, 0, 0, 0, 23, 161],
    },
  };
  departmentList = departmentList.concat(mappedData);

  return [200, { status: "success", data: "Data added successfully" }];
});

mock.onPut("/department").reply(200, {
  status: "success",
  data: {
    recordsets: [],
    output: {},
    rowsAffected: [1],
  },
});
mock.onDelete("/departement/1").reply(200, {
  status: "success",
  data: {
    recordsets: [],
    output: {},
    rowsAffected: [1],
  },
});

mock.onGet("/category").reply(200, masterCategoryData);
mock
  .onPost("/category")
  .reply(200, { status: "success", data: "Data added successfully" });
mock
  .onPut("/category", { id: 1, name: "test", departmentCode: "test" })
  .reply(200, {
    status: "success",
    data: {
      recordsets: [],
      output: {},
      rowsAffected: [1],
    },
  });
mock.onDelete("/category/1").reply(200, {
  status: "success",
  data: {
    recordsets: [],
    output: {},
    rowsAffected: [1],
  },
});
