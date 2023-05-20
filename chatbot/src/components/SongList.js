import {
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";

export default function SongList() {
  let [songs, setSongs] = useState(null);

  useEffect(() => {
    async function FetchData() {
      const data = await fetch("http://localhost:5000/songs");
      const response = await data.json();
      setSongs(response);
    }
    FetchData();
  }, []);

  if (songs === null) {
    return <div>Loading...</div>;
  }
  console.log(songs);
  // songs = JSON.parse(songs);
  // console.log(songs);

  return (
    <div
      style={{
        backgroundColor: "#FFFFF7",
      }}
    >
      <Grid container spacing={5}>
        {songs.map((song, i) => (
          <Grid item xl={2} xs={6} lg={2.4} md={3} sm={3} key={i}>
            <Card key={song["name"]} sx={{ width: "180px", height: "200px" }}>
              <CardContent>
                <img src={song["image"][1]["#text"]} alt={song["name"]} />
                <Typography variant="h5" component="div">
                  {song["artist"]["name"]}
                </Typography>
                <a target="_blank" href={song["url"]}>
                  {song["name"]}
                </a>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
