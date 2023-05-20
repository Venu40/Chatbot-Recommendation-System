import React, { useState } from "react";
import axios from "axios";
import SongList from "./SongList";
import SpotifyList from "./SpotifyList";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Container,
  Box,
} from "@mui/material";

const Chatbot = () => {
  const [previousChats, setPreviousChats] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [message, setMessage] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questionCount < 8) {
      try {
        const response = await axios.post("http://localhost:5000/chatbot", {
          message,
        });
        setPreviousChats([
          ...previousChats,
          { user: message, bot: response.data.response },
        ]);
        setCurrentResponse(response.data.response);
        setQuestionCount(questionCount + 1);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/songs", {
          message,
        });
        setPreviousChats([
          ...previousChats,
          { user: message, bot: response.data.response },
        ]);
        setCurrentResponse(response.data.response);
      } catch (err) {
        console.log(err);
      }
    }
    setMessage("");
  };

  const renderInput = () => {
    if (questionCount < 8) {
      return (
        <Stack direction="row" justifyContent="flex-end" margin={2}>
          {/* <form onSubmit={handleSubmit}> */}
          {/* <input
              type="text"
              placeholder="Enter your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            /> */}
          {/* <Container maxWidth="md"> */}
          <TextField
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></TextField>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Send
          </Button>
          {/* </Container> */}
          {/* </form> */}
        </Stack>
      );
    }
  };

  return (
    <div
      style={{
        padding: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundImage:
            "url(https://support.delta.chat/uploads/default/768ded5ffbef90faa338761be1c5633d91cc35e3)",
          minHeight: "65vh",
        }}
      >
        {previousChats.map((chat, index) => (
          <Stack key={index}>
            {/* <Typography
              sx={{ float: "right", marginBottom: "20px" }}
              component="inline-block"
              fullWidth
            >
              <strong>Chatbot:</strong> {chat.bot}
            </Typography> */}
            <Stack alignItems="self-end">
              <Typography
                sx={{
                  flex: 1,
                  marginBottom: "10px",
                  backgroundColor: "#4FB6EC",
                  borderRadius: "10px",
                  padding: "5px",
                  color: "white",
                }}
              >
                <strong>You:</strong> {chat.user}
              </Typography>
            </Stack>
            <Stack alignItems="self-start">
              <Typography
                sx={{
                  flex: 1,
                  marginBottom: "10px",
                  backgroundColor: "white",

                  borderRadius: "10px",
                  padding: "5px",
                }}
              >
                <strong>Chatbot:</strong> {chat.bot}
              </Typography>
            </Stack>
          </Stack>
        ))}
        {renderInput()}
      </Container>

      {questionCount === 8 && (
        <div style={{ float: "left" }}>
          <h1>Last.fm song Recommendations</h1>
          <SongList />
        </div>
      )}
      {questionCount === 8 && (
        <div>
          <h1>Spotify song Recommendations</h1>
          <SpotifyList />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
