import { Router } from 'itty-router';
import { newCachedTempusFetcher, newTempusSchema } from 'tempus-api-graphql';
import { graphql } from 'graphql';
import playground from './playground';

const BASE_URL = "https://tempus.xyz/api/";
const graphQLOptions = {
  baseEndpoint: '/',
  playgroundEndpoint: '/',
  forwardUnmatchedRequestsToOrigin: false,
  debug: false,
  cors: true,
}

const router = Router();

async function fetchResponseByUrl(url) {
  let res = await fetch(`${BASE_URL}${url}`);
  res = await res.json();
  return res.error ? null : res;
}

const schema = newTempusSchema(newCachedTempusFetcher(fetchResponseByUrl));

function graphQLFetcher(graphQLParams) {
  return graphql(
    schema,
    graphQLParams.query,
    null,
    null,
    graphQLParams.variables
  );
}

router.post('/', async (request) => {
  let body = await request.json();
  let result = await graphQLFetcher({ query: body.query, variables: body.variables });
  const resultString = JSON.stringify(result, null, 2);
  return new Response(resultString, { headers: { 'Content-Type': 'application/json' } });
});
router.get('/', (request) => playground(request, graphQLOptions));
router.all('*', () => new Response('404 Not Found', { status: 404 }));

export default {
	fetch: router.handle,
};
