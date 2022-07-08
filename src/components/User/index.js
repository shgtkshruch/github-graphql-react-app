
import { gql } from 'graphql-request';
import { useGitHubAPI } from '../../hooks/useGitHubAPI';

export function User() {
  const query = gql`
    {
      viewer {
        login
      }
    }
  `
  const data = useGitHubAPI(query);
  const username = data ? data.viewer.login : 'guest';

  return (
    <h1>{username}</h1>
  );
}
