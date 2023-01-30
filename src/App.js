import logo from "./logo.svg";
import "./App.css";
import queryString from "query-string";
import axios from "axios";
import { useCallback } from "react";

const parseQueryString = (search) => {
  const parsed = queryString.parse(search);
  const access_token = (parsed && parsed.access_token) || undefined;
  const refresh_token = (parsed && parsed.refresh_token) || undefined;
  return { access_token, refresh_token };
};
// parseQueryString(window.location.search)

const fetchData = async (query) => {
  const { access_token, refresh_token } = parseQueryString(query);
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return response && response.data ? response.data : undefined;
};

function App() {
  console.log("FOOO", window.location.hash.substring(1));
  const foo = useCallback(async () => await fetchData(window.location.hash));
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
        <a href="http://localhost:8080/auth/login">Log in with Spotify</a>
      </header>
    </div>
  );
}

export default App;
