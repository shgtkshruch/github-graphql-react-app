import { gql } from 'graphql-request';
import { useGitHubAPI } from './useGitHubAPI';

function App() {
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

export default App;
