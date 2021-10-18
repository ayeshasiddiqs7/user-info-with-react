import "./App.css";
import { useEffect, useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import now from "performance-now";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(async () => {
    const start = now();
    let resp = await fetch("https://api.randomuser.me/");
    setUserInfo(await resp.json());
    const end = now();
    setTimeTaken((end - start).toFixed(3) / 1000);
  }, []);

  return (
    <div className="App">
      <div className="title-style">
        <h1>User Details</h1>
        <h6 className="mb-2 text-muted">With React.js (Client Side)</h6>
        <p>
          Time taken to fetch the user:{" "}
          {timeTaken === null ? <i>calculating</i> : <>{timeTaken}s</>}{" "}
        </p>
      </div>
      <br />
      {userInfo.hasOwnProperty("results") ? (
        userInfo.results.map((user) => (
          <>
            <div className="d-flex justify-content-center">
              <Card style={{ width: "fit-content", textAlign: "justify" }}>
                <Card.Body>
                  <Card.Header>
                    <Card.Title>
                      <img src={user.picture.medium} alt="user-pic" />
                      &nbsp;
                      {user.name.title} {user.name.first} {user.name.last}
                    </Card.Title>
                  </Card.Header>

                  <br />
                  <p>
                    <b>Gender:</b>{" "}
                    {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                  </p>
                  <p>
                    <b>Date of Birth:</b>{" "}
                    {new Date(user.dob.date).toLocaleString("en-US", {
                      timeZone: "Asia/Jakarta",
                    })}
                  </p>
                  <p>
                    <b>Email:</b> {user.email}
                  </p>
                  <p>
                    <b>Country:</b> {user.location.country}
                  </p>
                </Card.Body>
              </Card>
            </div>
            <br />
            <Button
              variant="outline-danger"
              onClick={() => window.location.reload()}
            >
              Click here to display different user
            </Button>
          </>
        ))
      ) : (
        <p>
          <AiOutlineLoading3Quarters className="App-logo" />
          &nbsp; Loading user info...
        </p>
      )}
      <br />
      <br />
      <hr />
      <Badge style={{ backgroundColor: "coral" }}>
        Note: The above users are fetched from a random user api.
      </Badge>
      <br />
      <Badge style={{ backgroundColor: "coral" }}>
        Learn more about how to make an API call with react 👉🏻
        <a href="https://reactjs.org/docs/faq-ajax.html" target="_blank">
          https://reactjs.org/docs/faq-ajax.html
        </a>
      </Badge>
    </div>
  );
}

export default App;
