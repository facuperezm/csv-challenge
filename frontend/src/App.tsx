import React from "react";
import "./App.css";
import { uploadFiles } from "./server/upload";
import { toast, Toaster } from "sonner";
import { Data } from "./types";

const APP_STATUS = {
  IDLE: "idle",
  ERROR: "error",
  READY: "ready",
  UPLOADING: "uploading",
  COMPLETED: "completed",
};

const buttonMessage = {
  [APP_STATUS.READY]: "Upload file",
  [APP_STATUS.UPLOADING]: "Uploading",
};

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

function App() {
  const [appStatus, setAppStatus] = React.useState<AppStatusType>(
    APP_STATUS.IDLE
  );
  const [file, setFile] = React.useState<File | null>(null);
  const [data, setData] = React.useState<Data | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [file] = e.target.files ?? [];

    if (!file) {
      throw new Error("Missing file");
    }

    setFile(file);
    setAppStatus(APP_STATUS.READY);
  }

  async function handleFileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      throw new Error("Missing file");
    }

    setAppStatus(APP_STATUS.UPLOADING);
    const res = await uploadFiles(file);

    if (res instanceof Error) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(res.message);
      return;
    }

    setData(res);
    setAppStatus(APP_STATUS.COMPLETED);
    toast.success("The file was uploaded successfully");
  }

  const showButton =
    appStatus === APP_STATUS.READY ||
    appStatus === APP_STATUS.ERROR ||
    appStatus === APP_STATUS.UPLOADING;
  return (
    <>
      <Toaster />
      <header>
        <h1>FullStack Application - CSV Challenge</h1>
      </header>
      <main>
        <form onSubmit={handleFileSubmit}>
          <label htmlFor="files">
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </label>
          {showButton && (
            <button disabled={appStatus === APP_STATUS.UPLOADING}>
              {buttonMessage[appStatus] ?? "Upload file"}
            </button>
          )}
        </form>
        {appStatus === APP_STATUS.COMPLETED && (
          <section>
            <h2>File uploaded successfully</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>

            <button onClick={() => setAppStatus(APP_STATUS.READY)}>
              Upload another file
            </button>
          </section>
        )}

        {/* <form>
          <input type="text" name="search" />
        </form> */}
      </main>
    </>
  );
}

export default App;
