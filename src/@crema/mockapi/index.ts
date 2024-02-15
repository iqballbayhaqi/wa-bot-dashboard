import "./apis";
import mock from "./apis/MockConfig";

// export * from "./fakedb/account";
// export * from "./fakedb/account/countries";

mock.onAny().passThrough();

// mock.restore();
