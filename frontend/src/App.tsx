import React from "react";
import { uploadFiles } from "./server/upload";
import { toast, Toaster } from "sonner";
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
  [APP_STATUS.COMPLETED]: "Remove current file",
};

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

export default function App() {
  const [appStatus, setAppStatus] = React.useState<AppStatusType>(
    APP_STATUS.IDLE
  );
  const [file, setFile] = React.useState<File | null>(null);
  const queryClient = useQueryClient();

  function handleError(error: Error) {
    toast.error(error.message || "An unexpected error occurred");
    setAppStatus(APP_STATUS.ERROR);
  }

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

  const { mutate, isPending } = useMutation({
    mutationFn: uploadFiles,
    onMutate: () => {
      setAppStatus(APP_STATUS.UPLOADING);
    },
    onError: (error) => {
      handleError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search"] });
      setAppStatus(APP_STATUS.COMPLETED);
      toast.success("File uploaded successfully!");
    },
  });

  async function handleFileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      handleError(new Error("Error: no file selected"));
      return;
    }
    mutate(file);
  }

  const showButton =
    appStatus === APP_STATUS.READY ||
    appStatus === APP_STATUS.COMPLETED ||
    appStatus === APP_STATUS.UPLOADING ||
    appStatus === APP_STATUS.ERROR;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Toaster />
      <header className="text-center py-6">
        <h1 className="text-2xl font-mono">
          FullStack Application - CSV Challenge
        </h1>
      </header>
      <main>
        {appStatus !== APP_STATUS.COMPLETED && (
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
                placeholder="Upload a .csv file"
              />
            </Label>
            {showButton && (
              <Button
                disabled={appStatus === APP_STATUS.UPLOADING || isPending}
              >
                {buttonMessage[appStatus] ?? "Upload file"}
              </Button>
            )}
          </form>
        )}
        {appStatus === APP_STATUS.COMPLETED && (
          <div className="flex gap-4 items-center pb-4 justify-center">
            <p className="text-muted-foreground text-sm truncate">
              File uploaded: {file ? file.name : ".csv"}
            </p>
            <Button onClick={handleResetForm}>Upload another file</Button>
          </div>
        )}
        <div>{appStatus === APP_STATUS.COMPLETED && <Search />}</div>
      </main>
    </div>
  );
}
