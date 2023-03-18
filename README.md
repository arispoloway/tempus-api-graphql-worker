## tempus-api-graphql-worker

A [Cloudflare Worker](https://workers.cloudflare.com/) deployed to [tempus.nolem.me](https://tempus.nolem.me) exposing a GraphQL interface for [tempus.xyz](https://tempus.xyz).

Loading the site in a browser will show a playground allowing you to experiment with the API, and the site accepts `POST` requests to `https://tempus.nolem.me/` with the standard GraphQL parameters as `application/json`:

```
POST https://tempus.nolem.me/
{
  "query": "{ map { ... } }",
  "variables": { "myVariable": "..." }
}
```

This worker is mostly just a wrapper around the [tempus-api-graphql](https://github.com/arispoloway/tempus-api-graphql) package.
