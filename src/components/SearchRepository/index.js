import { useState } from 'react';
import { gql } from 'graphql-request';
import { useGitHubAPI } from '../../hooks/useGitHubAPI';

const LANGUAGES = [
  'JavaScript',
  'Ruby',
  'Rust',
  'Python'
]

export function SearchRepository() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [number, setNumber] = useState(10);

  const query = gql`
  {
    search(
      type: REPOSITORY,
      query: """language:${language}""",
      first: ${number}
    ) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            url
            name
            description
            createdAt
          }
        }
      }
    }
  }
  `
  const data = useGitHubAPI(query);

  return (
    <>
      <h1>Repositories</h1>
      {LANGUAGES.map(lang => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
        >{lang}</button>
      ))}
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <ul>
        {data && data.search.edges.map(({ node }) => ( 
          <li key={node.id}>
            <a href={node.url} target="_blank" rel="noreferrer noopener">
              {node.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
