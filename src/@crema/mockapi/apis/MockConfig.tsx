import axios from "@crema/services/axios/ApiConfig";

import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 2000 });

export default mock;
