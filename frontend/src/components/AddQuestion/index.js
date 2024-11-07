import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./index.css";
import Editor from "react-quill/lib/index.js";
import axios from "axios";
import TagInput from './TagsInput';
import { selectUser } from "../../features/userSlice";
import { useHistory } from "react-router-dom";
// import ChipsArray from "./TagsInput";

function Index() {
  const user = useSelector(selectUser);
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  /*
   * PropType validation
   */

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false)

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && body !== "") {
      setLoading(true)
      const bodyJSON = {
        title: title,
        body: body,
        tags: tags,
        user: user,
      };
      await axios
        .post("/api/question", bodyJSON)
        .then((res) => {
          console.log(res.data);
          alert("Question added successfully");
          setLoading(false)
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    }
  };
  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you're asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding the index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  modules={Editor.modules}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                {/* <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  data-role="tagsinput"
                  data-tag-trigger="Space"
                  type="text"
                  placeholder="e.g. (asp.net-mvc php react json)"
                /> */}
                <TagInput tags={tags} setTags={setTags} />

                {/* <ChipsArray /> */}
              </div>
            </div>
          </div>
        </div>

        <button disabled={loading} onClick={handleSubmit} className="button">
          {loading ? "Adding Question..." : "Add your question"}
        </button>
      </div>
    </div>
  );
}

export default Index;