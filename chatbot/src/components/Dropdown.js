import { useState } from "react";
import SpotifyList from "./SpotifyList";
import { FormControl, MenuItem, Select } from "@mui/material";
const Dropdown = () => {
  const [lang, setLang] = useState("english");
  const handleLangChange = (event) => {
    setLang(event.target.value);
  };
  return (
    <div>
      {/* <select name="lang" onChange={handleLangChange}>
        <option value="english">English</option>
        <option value="telugu">Telugu</option>
        <option value="hindi">Hindi</option>
        <option value="tamil">Tamil</option>
        <option value="punjabi">Punjabi</option>
      </select> */}
      <SpotifyList lang={lang}></SpotifyList>
      <FormControl>
        <Select name="lang" onChange={handleLangChange}>
          <MenuItem value="english">English</MenuItem>
          <MenuItem value="telugu">Telugu</MenuItem>
          <MenuItem value="hindi">Hindi</MenuItem>
          <MenuItem value="tamil">Tamil</MenuItem>
          <MenuItem value="punjabi">Punjabi</MenuItem>
        </Select>
      </FormControl>
      <SpotifyList lang={lang}></SpotifyList>
    </div>
  );
};
export default Dropdown;
