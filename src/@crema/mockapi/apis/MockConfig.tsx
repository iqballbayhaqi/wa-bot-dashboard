import axios from "@crema/services/axios/ApiConfig";

import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 500 });

export default mock;
