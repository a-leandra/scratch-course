/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const setup = () => {
  render(<App />);
  userEvent.click(screen.getByText("A"));
};

test("student search with match", () => {
  setup();
  userEvent.type(screen.getAllByPlaceholderText("Wyszukaj...")[1], "m");
  expect(screen.getByText("Marta Kijek 24%")).toBeTruthy();
  expect(screen.queryByText("Bogdan Kawka 78%")).toBeNull();
});

test("student sort reverse", () => {
  const { container } = render(<App />);
  userEvent.click(screen.getByText("A"));
  userEvent.click(container.getElementsByClassName("ui icon button")[1]);
  expect(container.getElementsByClassName("header")[3]).toHaveTextContent(
    "Marta Kijek 24%"
  );
  expect(container.getElementsByClassName("header")[4]).toHaveTextContent(
    "Bogdan Kawka 78%"
  );
  expect(container.getElementsByClassName("header")[5]).toHaveTextContent(
    "Alicja Bobkowska 34%"
  );
});
