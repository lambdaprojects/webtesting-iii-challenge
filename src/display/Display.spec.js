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
