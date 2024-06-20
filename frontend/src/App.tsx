import React from "react";
import { uploadFiles } from "./server/upload";
import { Toaster } from "sonner";
import Search from "./components/search";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  function handleResetForm() {
    setAppStatus(APP_STATUS.IDLE);
    setFile(null);

    // Reset the URL
    window.history.pushState({}, "", window.location.pathname);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [file] = e.target.files ?? [];

    if (!file) {
      throw new Error("Missing file");
    }
    setFile(file);
    setAppStatus(APP_STATUS.READY);
  }

  const { mutate } = useMutation({
    mutationFn: uploadFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });

  async function handleFileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (file) {
      mutate(file);
      setAppStatus(APP_STATUS.COMPLETED);
    } else {
      console.error("No file selected");
    }
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
          {appStatus === APP_STATUS.COMPLETED && <Search />}
        </div>
      </main>
    </div>
  );
}

export default App;
