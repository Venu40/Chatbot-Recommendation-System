import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
const SpotifyList = () => {
  const [langg, setLang] = useState("english");

  const [songs, setSongs] = useState(null);
  const handleLangChange = (event) => {
    setLang(event.target.value);
    setSongs(null);
  };

  useEffect(() => {
    fetch("http://localhost:5000/spotify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lang: langg,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        setSongs(data.items);
      })
      .catch((error) => console.error(error));
  }, [langg]);

  if (songs === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <select value={langg} name="lang" onChange={handleLangChange}>
        <option value="english">English</option>
        <option value="telugu">Telugu</option>
        <option value="hindi">Hindi</option>
        <option value="tamil">Tamil</option>
        <option value="punjabi">Punjabi</option>
      </select> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "10px",
        }}
      >
        <Typography variant="span" component="h2">
          Select Language:
        </Typography>
        <FormControl size="small">
          <Select value={langg} name="lang" onChange={handleLangChange}>
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="telugu">Telugu</MenuItem>
            <MenuItem value="hindi">Hindi</MenuItem>
            <MenuItem value="tamil">Tamil</MenuItem>
            <MenuItem value="punjabi">Punjabi</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Grid container gap={7} justifyContent="center">
          {songs.slice(0, 50).map((song, i) => {
            if (song["track"]["name"] && song["track"]["album"]["images"][0]) {
              return (
                <Grid item lg={3}>
                  <Card
                    elevation={5}
                    sx={{
                      width: "280px",
                      height: "330px",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <center>
                        <img
                          src={song["track"]["album"]["images"][0]["url"]}
                          alt={song["track"]["name"]}
                          width="200"
                          height="200"
                        />
                      </center>

                      <Typography>
                        Movie Name : {song["track"]["album"]["name"]}
                      </Typography>
                      <a
                        href={song["track"]["external_urls"]["spotify"]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {song["track"]["name"]}
                      </a>
                    </div>
                  </Card>
                </Grid>
                // </li>
              );
            }
          })}
        </Grid>
      </div>
    </div>
  );
};
export default SpotifyList;
