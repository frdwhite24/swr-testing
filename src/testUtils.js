import { server } from "./mocks/server";
import { constructQuery, queries } from "./mocks/handlers";

// This is a function used to fill the runtime request handle objects
// with the rest of the props from the original mocked handlers, and only change
// the ones being updated in the test. The runtime request handlers are also
// assigned to the server

export const runtimeReqHandlers = (...handlers) => {
  const newHandlers = handlers.map((handler) => {
    const fullQuery = queries.filter(
      (query) => query.query === handler.query
    )[0];
    if (fullQuery) {
      Object.entries(fullQuery.response).forEach((response) => {
        const [name, data] = response;
        handler.response[name] = { ...data, ...handler.response[name] };
      });
    }
    return constructQuery(handler);
  });
  server.use(...newHandlers);
};
