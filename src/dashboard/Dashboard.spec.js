// Test away
import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import { render, fireEvent } from "@testing-library/react";
import Controls from "../controls/Controls";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

describe("Dashboard() - Shows the control and display", () => {
  it("Render successful", () => {
    render(<Dashboard />);
  });

  it("Default values check", () => {
    const { getByText, getByTestId } = render(<Dashboard />);
    expect(getByText(/Unlocked/i)).not.toBeNull();
    expect(getByText(/Open/i)).not.toBeNull();
    expect(getByText(/Lock Gate/i)).not.toBeNull();
    expect(getByText(/Close Gate/i)).not.toBeNull();
    // should not be able to click on lock gate
    let closeBtn = getByTestId(/closeBtn/i);
    expect(closeBtn).toHaveClass("green-led");
    let lockBtn = getByTestId(/lockBtn/i);
    expect(lockBtn).toHaveClass("green-led");
  });

  it("Displays closed if the closed prop is true and open if otherwise", () => {
    // click on close gate
    const { getByText, getByTestId } = render(<Dashboard />);
    let closeGateBtn = getByText(/close gate/i);
    fireEvent.click(closeGateBtn);

    expect(getByText(/open gate/i)).not.toBeNull();
    expect(getByText(/unlocked/i)).not.toBeNull();
    expect(getByText(/lock gate/i)).not.toBeNull();
    expect(getByText(/closed/i)).not.toBeNull();

    let closeBtn = getByTestId(/closeBtn/i);
    expect(closeBtn).toHaveClass("red-led");
    let lockBtn = getByTestId(/lockBtn/i);
    expect(lockBtn).toHaveClass("green-led");
  });

  it("Checking control render through props - locked=false, closed=false", () => {
    const toggleLockedSpy = jest.fn();
    const toggleClosedSpy = jest.fn();
    const { getByText } = render(
      <Controls
        locked={false}
        closed={false}
        toggleLocked={toggleLockedSpy}
        toggleClosed={toggleClosedSpy}
      />
    );
    expect(getByText(/close gate/i)).not.toBeNull();
    expect(getByText(/lock gate/i)).not.toBeNull();
    expect(toggleClosedSpy).not.toHaveBeenCalled();
    expect(toggleLockedSpy).not.toHaveBeenCalled();
    fireEvent.click(getByText(/close gate/i));
    expect(toggleClosedSpy).toHaveBeenCalledTimes(1);
    expect(toggleLockedSpy).not.toHaveBeenCalled();
  });
});
