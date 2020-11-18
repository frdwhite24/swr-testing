import { server } from "./mocks/server.js";
import { cache } from "swr";

beforeAll(() => {
  // This explicitly tells me if any requests get through the mocking unhandled.
  // Either way the requests would fail as the API url and auth token is fake
  server.listen({
    onUnhandledRequest(req) {
      console.warn(
        `Missing request handler, please add one for the request: ${req.body.query}`
      );
    },
  });
});

afterEach(() => {
  // SWR caching is cleared as stated in https://github.com/vercel/swr/pull/231
  cache.clear();

  // MSW server runtime request handlers are reset as recommended in
  // https://mswjs.io/docs/getting-started/integrate/node#using-create-react-app
  server.resetHandlers();
});

afterAll(() => server.close());
