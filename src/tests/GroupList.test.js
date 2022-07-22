/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("group submition without repeat", async () => {
  render(<App />);
  userEvent.type(
    screen.getByPlaceholderText("Wpisz nazwę nowej grupy..."),
    "c5b"
  );
  userEvent.click(screen.getByText("Dodaj"));
  let newGroup = await screen.findByText("C5B");
  expect(newGroup).toBeTruthy();
});

test("group search with match", () => {
  render(<App />);
  userEvent.type(screen.getAllByPlaceholderText("Wyszukaj...")[0], "b");
  expect(screen.getByText("B")).toBeTruthy();
  expect(screen.queryByText("A")).toBeNull();
});

test("group sort reverse", () => {
  const { container } = render(<App />);
  userEvent.click(container.getElementsByClassName("ui icon button")[0]);
  expect(container.getElementsByClassName("header")[0]).toHaveTextContent("B");
  expect(container.getElementsByClassName("header")[1]).toHaveTextContent("A");
});

test("group showing students", async () => {
  const { container } = render(<App />);
  userEvent.click(screen.getByText("A"));
  expect(screen.getByText("Grupa A")).toBeTruthy();
  expect(screen.getByText("| 3 uczniów | 45% ukończenia")).toBeTruthy();
  expect(container.getElementsByClassName("header")[3]).toHaveTextContent(
    "Alicja Bobkowska 34%"
  );
  expect(container.getElementsByClassName("header")[4]).toHaveTextContent(
    "Bogdan Kawka 78%"
  );
  expect(container.getElementsByClassName("header")[5]).toHaveTextContent(
    "Marta Kijek 24%"
  );
});
