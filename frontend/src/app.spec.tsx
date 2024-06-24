import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.tsx";
import { renderWithClient } from "./lib/helper.tsx";

describe("App", () => {
  it("renders header text", async () => {
    renderWithClient(<App />);
    const headerElement = screen.getByText(/csv challenge/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders initial file input", async () => {
    renderWithClient(<App />);
    const fileInput = screen.getByPlaceholderText(/upload a .csv file/i);
    expect(fileInput).toBeInTheDocument();
  });

  it("renders button with correct initial text", async () => {
    const user = userEvent.setup();

    renderWithClient(<App />);

    await user.click(screen.getByPlaceholderText(/upload a .csv file/i));
    await user.upload(
      screen.getByPlaceholderText(/upload a .csv file/i),
      new File(["file content"], "test.csv", { type: "text/csv" })
    );
    const buttonElement = screen.getByRole("button", { name: "Upload file" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Upload file");
  });

  // it("file input change updates state and button text", async () => {
  //   renderWithClient(<App />);
  //   const fileInput = screen.getByLabelText(/file/i);
  //   const file = new File(["file content"], "test.csv", { type: "text/csv" });

  //   await userEvent.upload(fileInput, file);

  //   const selectedFile = screen.getByDisplayValue("test.csv");
  //   expect(selectedFile).toBeInTheDocument();

  //   const buttonElement = screen.getByRole("button");
  //   expect(buttonElement).toHaveTextContent("Upload file");
  // });

  // it("clicking the button triggers file upload", async () => {
  //   const { mutate } = useMutation(uploadFiles);

  //   renderWithClient(<App />);

  //   const fileInput = screen.getByLabelText(/file/i);
  //   const file = new File(["file content"], "test.csv", { type: "text/csv" });

  //   await userEvent.upload(fileInput, file);

  //   const buttonElement = screen.getByRole("button", { name: "Upload file" });
  //   userEvent.click(buttonElement);

  //   await waitFor(() => {
  //     expect(mutate).toHaveBeenCalledWith(file);
  //   });
  // });
});
