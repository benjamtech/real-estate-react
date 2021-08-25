/**
 * @jest-environment jsdom
 */

import useRStateWatcher from "../useRStateWatcher";
import RState from "@real-estate/core";
import { render, getByTestId, fireEvent } from "@testing-library/react"
import ReactDOM from "react-dom"

const state = new RState("hei");
const App = () => {
    useRStateWatcher([state]);  

    return (
        <div>
            <p data-testid="text">{state.get()}</p>
            <button data-testid="btn" onClick={() => {
                state.set("heidu")
            }}></button>
        </div>
    );
};

test("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("Expect state to be correct", () => {
  const { container } = render(<App />);
  const countValue = getByTestId(container, "text");
  expect(countValue.textContent).toBe("hei");
});

test("Expect State to update", () => {
  const { container } = render(<App />);
  const countValue = getByTestId(container, "text");
  expect(countValue.textContent).toBe("hei");

  const btn = getByTestId(container, "btn")
  fireEvent.click(btn)

  const newCountValue = getByTestId(container, "text");
  expect(newCountValue.textContent).toBe("heidu")
})

