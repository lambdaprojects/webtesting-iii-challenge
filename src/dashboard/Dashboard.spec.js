// Test away
import React from "react";
//import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import { render, fireEvent } from "@testing-library/react";
import Controls from "../controls/Controls";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import Display from "../display/Display";

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
      // click->close
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
      // click->close->open
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
      // click -> close -> lock
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
    it("TC:DB6::Gate (Closed + lock) - click -> close -> lock->open", () => {
      // click -> close -> lock->open
      const { getByText, getByTestId } = render(<Dashboard />);
      let closeGateBtn = getByText(/close gate/i);
      fireEvent.click(closeGateBtn);
      let lockGateBtn = getByText(/lock gate/i);
      fireEvent.click(lockGateBtn);
      let openGateBtn = getByText(/open gate/i);
      fireEvent.click(openGateBtn);
      expect(getByText(/open gate/i)).not.toBeNull();
      expect(getByText(/locked/i)).not.toBeNull();
      expect(getByText(/unlock gate/i)).not.toBeNull();
      expect(getByText(/closed/i)).not.toBeNull();

      let closeBtn = getByTestId(/closeBtn/i);
      expect(closeBtn).toHaveClass("red-led");
      let lockBtn = getByTestId(/lockBtn/i);
      expect(lockBtn).toHaveClass("red-led");
    });

    it("TC:DB7::Gate (Closed + lock) - click -> close -> lock->unlock", () => {
      // click -> close -> lock->open
      const { getByText, getByTestId } = render(<Dashboard />);
      let closeGateBtn = getByText(/close gate/i);
      fireEvent.click(closeGateBtn);
      let lockGateBtn = getByText(/lock gate/i);
      fireEvent.click(lockGateBtn);
      let unlockGateBtn = getByText(/unlock gate/i);
      fireEvent.click(unlockGateBtn);
      expect(getByText(/open gate/i)).not.toBeNull();
      expect(getByText(/unlocked/i)).not.toBeNull();
      expect(getByText(/lock gate/i)).not.toBeNull();
      expect(getByText(/closed/i)).not.toBeNull();

      let closeBtn = getByTestId(/closeBtn/i);
      expect(closeBtn).toHaveClass("red-led");
      let lockBtn = getByTestId(/lockBtn/i);
      expect(lockBtn).toHaveClass("green-led");
    });
  });
  describe("Dashboard() -> Controls() -> props testing", () => {
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
  describe("Dashboard()->Display()", () => {
    it("TC:DBD11::Testing display render through props - locked=false, closed=false", () => {
      const { getByText, getByTestId } = render(
        <Display locked={false} closed={false} />
      );
      expect(getByText(/unlocked/i)).not.toBeNull();
      expect(getByText(/open/i)).not.toBeNull();

      let closeBtn = getByTestId(/closeBtn/i);
      expect(closeBtn).toHaveClass("green-led");
      let lockBtn = getByTestId(/lockBtn/i);
      expect(lockBtn).toHaveClass("green-led");
    });

    it("TC:DBD12::Testing display render through props - locked=false, closed=true", () => {
      const { getByText, getByTestId } = render(
        <Display locked={false} closed={true} />
      );
      expect(getByText(/unlocked/i)).not.toBeNull();
      expect(getByText(/closed/i)).not.toBeNull();

      let closeBtn = getByTestId(/closeBtn/i);
      expect(closeBtn).toHaveClass("red-led");
      let lockBtn = getByTestId(/lockBtn/i);
      expect(lockBtn).toHaveClass("green-led");
    });

    it("TC:DBD13::Testing display render through props - locked=true, closed=false", () => {
      const { getByText, getByTestId } = render(
        <Display locked={true} closed={false} />
      );
      expect(getByText(/locked/i)).not.toBeNull();
      expect(getByText(/open/i)).not.toBeNull();

      let closeBtn = getByTestId(/closeBtn/i);
      expect(closeBtn).toHaveClass("green-led");
      let lockBtn = getByTestId(/lockBtn/i);
      expect(lockBtn).toHaveClass("red-led");
    });

    it("TC:DBD14::Testing display render through props - locked=true, closed=true", () => {
      const { getByText, getByTestId } = render(
        <Display locked={true} closed={true} />
      );
      expect(getByText(/locked/i)).not.toBeNull();
      expect(getByText(/closed/i)).not.toBeNull();

      let closeBtn = getByTestId(/closeBtn/i);
      expect(closeBtn).toHaveClass("red-led");
      let lockBtn = getByTestId(/lockBtn/i);
      expect(lockBtn).toHaveClass("red-led");
    });
  });
});
