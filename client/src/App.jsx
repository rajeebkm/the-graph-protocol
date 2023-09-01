import { useState, useEffect } from "react";
import { createClient } from "urql";
import "./App.css";

function App() {
  const [tokens, setTokens] = useState([]);
  const [owner, setOwner] = useState();

  const queryURL = `https://gateway.thegraph.com/api/[graph-key]/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7`;
  const query = `{
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }`;
  const client = createClient({
    url: queryURL,
  });

  const queryURLOwner =
    "https://api.studio.thegraph.com/query/51958/ownercontract/v0.1";
  const queryOwner = `{
    ownerSets(first: 5) {
    id
    oldOwner
    newOwner
    blockNumber
    }
  }`;

  const clientOwner = createClient({
    url: queryURLOwner,
  });

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      console.log(data);
      setTokens(data.tokens);
    };
    getTokens();
    const getOwners = async () => {
      const { data } = await clientOwner.query(queryOwner).toPromise();
      console.log(data);
      setOwner(data.ownerSets);
    };
    getOwners();
  }, []);

  return (
    <>
      <div>
        Tokens Informations
        {tokens != null &&
          tokens.length > 0 &&
          tokens.map((token) => (
            <div key={token.id}>
              <div>{token.name}</div>
              <div>{token.symbol}</div>
              <div>{token.decimals}</div>
            </div>
          ))}
        Owner Informations
        {owner != null &&
          owner.length > 0 &&
          owner.map((owners) => (
            <div key={owners.id}>
              <div>{owners.oldOwner}</div>
              <div>{owners.newOwner}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
