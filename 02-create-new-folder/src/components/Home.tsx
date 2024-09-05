import React, { useEffect, useState } from "react";
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
  // Initial state to display folder create modal
  const [createFolder, setCreateFolder] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, []);

  // Keyboard key press to display create folder modal
  const keyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === "F") {
      setCreateFolder(!createFolder);
    }
  };

  const [folders, setFolders] = useState<Folder[]>([]);
  const [name, setName] = useState("");

  // Type folder name and create folder
  const typeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const create = () => {
    const newFolder = { id: folders.length, name: name };
    setFolders([...folders, newFolder]);
    setName("");
    setCreateFolder(!createFolder);
  };

  // Finish to create folder through entering "Enter" key
  const Enter = (e: { key: string }) => {
    if (e.key === "Enter") {
      return create();
    }
  };

  return (
    <div className="home">
      {/* if initial state variable is true, run the following code lines */}
      {createFolder && (
        <div className="folder-modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
