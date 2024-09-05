import React, { useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

// Set folder props
interface Folder {
  id: number;
  name: string;
}

// Home Component
export default function Home() {
  // Initial state to display modal box (modal box ပြသရန်)
  const [modalBox, setModalBox] = useState(false);
  // Modal position
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // x and y represent coordinate points

  // Mouse right click to display modal box options
  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    setModalBox(!modalBox);

    setModalPosition({ x: e.clientX, y: e.clientY }); // (modal position ကို mouse pointer ရဲ့တည်နေရာနဲ့ အနီးကပ်ဆုံးဖော်ပြရန်)
  };

  // if you want to hide modal box again
  const hideModalbox = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModalBox(false);
    }
  };
  // ---- Modal Box Display Finish ----

  // Initial state to display create new folder box
  const [newFolder, setNewFolder] = useState(false);

  // Creating folders
  const [folders, setFolders] = useState<Folder[]>([]);
  const [name, setName] = useState("");

  const handleModal = () => {
    setNewFolder(!newFolder);
    setModalBox(false);
  };

  // Type folder name and create folder
  const typeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const create = () => {
    const folderName = name.trim() ? name : "New Folder";
    const newFolder = { id: folders.length, name: folderName };

    setFolders([...folders, newFolder]);
    setName("");
    setNewFolder(false);
  };

  // Finish to create folder through entering "Enter" key
  const Enter = (e: { key: string }) => {
    if (e.key === "Enter") {
      return create();
    }
  };

  return (
    <div
      className="home"
      onContextMenu={handleRightClick}
      onClick={hideModalbox}
    >
      {/* if initial state variable is true, run the following code lines */}
      {modalBox && (
        <div className="modal-box">
          <div
            className="modal-content"
            style={{
              position: "absolute",
              top: `${modalPosition.y}px`, // horizontal distance
              left: `${modalPosition.x}px`, // vertical distance
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <li onClick={handleModal}>New Folder</li>
            <hr />
            <li>Paste</li>
            <hr />
            <li>Select All</li>
            <hr />
            <li>Arrange Icons</li>
            <li>Arrange By...</li>
            <hr />
            <li>Show Desktop in Files</li>
            <li>Open in Terminal</li>
            <hr />
            <li>Change Background...</li>
            <hr />
            <li>Desktop Icon Settings</li>
            <li>Display Settings</li>
          </div>
        </div>
      )}

      {/* After click New Folder in modal box */}
      {newFolder && (
        <div className="folder-modal">
          <div
            className="modal-content"
            style={{
              position: "absolute",
              top: `${modalPosition.y}px`, // horizontal distance
              left: `${modalPosition.x}px`, // vertical distance
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p>Folder Name</p>
            <section>
              <input
                type="text"
                placeholder="New Folder"
                onChange={typeFolderName}
                onKeyDown={Enter}
              />
              <button onClick={create}>OK</button>
            </section>
          </div>
        </div>
      )}

      {/* show folder list */}
      <div className="folder-list">
        {folders.map((folder) => (
          <div className="folder-item">
            <FontAwesomeIcon icon={faFolder} className="folder-icon" />
            <p
              style={{
                maxWidth: "80px",
                color: "black",
                userSelect: "none",
                overflow: "hidden",
              }}
            >
              {folder.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
