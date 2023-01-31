import logo from "./logo.svg";
import "./App.css";
import queryString from "query-string";
import axios from "axios";
import { useCallback } from "react";
import {Button} from "@material-ui/core"

const parseQueryString = (href) => {
  const parsed = queryString.parse(href);
  const code = (parsed && parsed.code) || undefined;
  const state = (parsed && parsed.state) || undefined;
  return { code, state };
};
// parseQueryString(window.location.search)

const fetchData = async (href) => {
  // const { code, state } = parseQueryString(href);
  // const response = await axios.get("https://api.spotify.com/v1/me", {
  //   headers: { Authorization: `Bearer ${access_token}` },
  // });
  const response = await axios.get(`http://localhost:8080/auth/callback/${href}`);
  console.log(response)
  // return response && response.data ? response.data : undefined;
};

function App() {
  console.log("FOOO", window.location.search);
  const foo = useCallback(async () => await fetchData(window.location.search));
  console.log(foo());
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button href="http://localhost:8080/auth/login">Log in with Spotify</Button>
      </header>
    </div>
  );
}

export default App;
