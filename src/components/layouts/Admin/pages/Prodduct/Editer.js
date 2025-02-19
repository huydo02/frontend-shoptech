import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "code", "image"],
        ["clean"],
        [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "code",
];

const TextEditor = ({ value, onChange, placeholder }) => {
    return (
        <>
            <ReactQuill
                theme="snow"
                value={value || ""}
                modules={modules}
                formats={formats}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    maxHeight: "300px",
                    // minHeight: "200px",
                    // overflowY: "auto",
                    // border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                }}
            />
        </>
    );
};

export default TextEditor;