// Test away!

import React from "react";
import ReactDOM from "react-dom";

import { render, fireEvent } from "@testing-library/react";
import Controls from "./Controls";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

describe("Controls() - Shows the control", () => {
  it("Render successful", () => {
    render(<Controls />);
  });
});
