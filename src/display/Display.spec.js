// Test away!

import React from "react";
import ReactDOM from "react-dom";
import Display from "./Display";
import { render, fireEvent } from "@testing-library/react";
import Controls from "../controls/Controls";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

describe("Display() - Shows the display", () => {
  it("Render successful", () => {
    render(<Display />);
  });
});
