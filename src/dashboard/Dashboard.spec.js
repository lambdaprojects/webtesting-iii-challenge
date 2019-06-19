// Test away
import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import { render, fireEvent } from "@testing-library/react";
import Controls from "../controls/Controls";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

describe("Dashboard() - Shows the control and display", () => {
  describe("Dashboard() -> Full testing -> UI", () => {
    it("TC:DB1::Render successful", () => {
      render(<Dashboard />);
    });

    it("TC:DB2::Default values check", () => {
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

    it("TC:DB3::Gate (Closed + unlocked) - click->close", () => {
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
    it("TC:DB4::Gate (Closed + unlocked) - click->close->open", () => {
      // click on close gate
      const { getByText, getByTestId } = render(<Dashboard />);
      let closeGateBtn = getByText(/close gate/i);
      fireEvent.click(closeGateBtn);
      let openGateBtn = getByText(/open gate/i);
      fireEvent.click(openGateBtn);
      expect(getByText(/close gate/i)).not.toBeNull();
      expect(getByText(/unlocked/i)).not.toBeNull();
      expect(getByText(/lock gate/i)).not.toBeNull();
      expect(getByText(/open/i)).not.toBeNull();

      let closeBtn = getByTestId(/closeBtn/i);
      expect(closeBtn).toHaveClass("green-led");
      let lockBtn = getByTestId(/lockBtn/i);
      expect(lockBtn).toHaveClass("green-led");
    });
    it("TC:DB5::Gate (Closed + lock) - click -> close -> lock", () => {
      // click on close gate
      const { getByText, getByTestId } = render(<Dashboard />);
      let closeGateBtn = getByText(/close gate/i);
      fireEvent.click(closeGateBtn);
      let lockGateBtn = getByText(/lock gate/i);
      fireEvent.click(lockGateBtn);
      expect(getByText(/open gate/i)).not.toBeNull();
      expect(getByText(/locked/i)).not.toBeNull();
      expect(getByText(/unlock gate/i)).not.toBeNull();
      expect(getByText(/closed/i)).not.toBeNull();

      let closeBtn = getByTestId(/closeBtn/i);
      expect(closeBtn).toHaveClass("red-led");
      let lockBtn = getByTestId(/lockBtn/i);
      expect(lockBtn).toHaveClass("red-led");
    });
  });
  describe("Dashboard() -> Controls() -> props testing", () => {
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

    it("Checking control render through props - locked=false, closed=false", () => {
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
  });
});
