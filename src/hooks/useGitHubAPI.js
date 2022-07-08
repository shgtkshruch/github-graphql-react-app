import { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.github.com/graphql';

export function useGitHubAPI(query) {
  const [data, setData] = useState(null);

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
    },
  })

  useEffect(() => {
    async function fetchData() {
      const response = await graphQLClient.request(query);
      setData(response);
    }
    console.log('fetch data');
    fetchData();
  }, [query]);

  return data;
}

