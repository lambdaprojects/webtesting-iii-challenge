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

  it("TC:DBC8::Testing control render through props - locked=false, closed=false", () => {
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

  it("TC:DBC9::Testing control render through props - locked=false, closed=true", () => {
    const toggleLockedSpy = jest.fn();
    const toggleClosedSpy = jest.fn();
    const { getByText } = render(
      <Controls
        locked={false}
        closed={true}
        toggleLocked={toggleLockedSpy}
        toggleClosed={toggleClosedSpy}
      />
    );
    expect(getByText(/open gate/i)).not.toBeNull();
    expect(getByText(/lock gate/i)).not.toBeNull();
    expect(toggleClosedSpy).not.toHaveBeenCalled();
    expect(toggleLockedSpy).not.toHaveBeenCalled();
    fireEvent.click(getByText(/open gate/i));
    expect(toggleClosedSpy).toHaveBeenCalledTimes(1);
    expect(toggleLockedSpy).not.toHaveBeenCalled();
  });

  it("TC:DBC10::Testing control render through props - locked=true, closed=true", () => {
    const toggleLockedSpy = jest.fn();
    const toggleClosedSpy = jest.fn();
    const { getByText } = render(
      <Controls
        locked={true}
        closed={true}
        toggleLocked={toggleLockedSpy}
        toggleClosed={toggleClosedSpy}
      />
    );
    expect(getByText(/open gate/i)).not.toBeNull();
    expect(getByText(/unlock gate/i)).not.toBeNull();
    expect(toggleClosedSpy).not.toHaveBeenCalled();
    expect(toggleLockedSpy).not.toHaveBeenCalled();
    fireEvent.click(getByText(/unlock gate/i));
    expect(toggleClosedSpy).not.toHaveBeenCalledTimes(1);
    expect(toggleLockedSpy).toHaveBeenCalled();
  });
});
