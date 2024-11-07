import React ,{ useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

// Define styled components for the Paper and Chip elements
const Root = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: theme.spacing(0.5),
  margin: 0,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function TagInput({ tags, setTags }) {
  const [newTag, setNewTag] = useState("");
  
  const handleDelete = (chipToDelete) => () => {
    setTags(tags.filter((chip) => chip !== chipToDelete));
  };

  const handleInputChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && newTag.trim() !== "" && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  return (
    <div>
      <Root component="ul">
        {tags.map((tag, index) => (
          <li key={index}>
            <StyledChip
              label={tag}
              onDelete={handleDelete(tag)}
              icon={tag === "React" ? <TagFacesIcon /> : undefined}
            />
          </li>
        ))}
      </Root>

      <input
        type="text"
        value={newTag}
        onChange={handleInputChange}
        onKeyDown={handleAddTag}
        placeholder="Add a tag"
        style={{
          padding: "5px",
          marginTop: "10px",
          borderRadius: "3px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
    </div>
  );
}
