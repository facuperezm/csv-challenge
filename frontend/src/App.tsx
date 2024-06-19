import React from "react";
import { uploadFiles } from "./server/upload";
import { toast, Toaster } from "sonner";
import { Data } from "./types";
import Search from "./components/search";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";

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
  [APP_STATUS.ERROR]: "Try again",
  [APP_STATUS.COMPLETED]: "Upload another file",
};

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

function App() {
  const [appStatus, setAppStatus] = React.useState<AppStatusType>(
    APP_STATUS.IDLE
  );
  const [file, setFile] = React.useState<File | null>(null);
  const [data, setData] = React.useState<Data | null>(null);

  function handleResetForm() {
    setAppStatus(APP_STATUS.IDLE);
    setFile(null);
    setData(null);

    // Reset the URL
    window.history.pushState({}, "", window.location.pathname);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [file] = e.target.files ?? [];

    if (!file) {
      throw new Error("Missing file");
    }
    console.log(file, "file");
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
    <div className="max-w-3xl mx-auto px-4">
      <Toaster />
      <header className="text-center py-6">
        <h1 className="text-2xl font-mono">
          FullStack Application - CSV Challenge
        </h1>
      </header>
      <main>
        <form
          className="flex flex-col md:flex-row gap-4 mx-auto max-w-lg justify-between"
          onSubmit={handleFileSubmit}
        >
          <Label htmlFor="files">
            <Input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full"
            />
          </Label>
          {showButton && (
            <Button disabled={appStatus === APP_STATUS.UPLOADING}>
              {buttonMessage[appStatus] ?? "Upload file"}
            </Button>
          )}

          {appStatus === APP_STATUS.COMPLETED && (
            <Button onClick={handleResetForm}>Upload another file</Button>
          )}
        </form>
        <div className="mt-4">
          {appStatus === APP_STATUS.COMPLETED && <Search initialData={data} />}
        </div>
      </main>
    </div>
  );
}

export default App;
