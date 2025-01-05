import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, it, vi } from "vitest";
import SubscribeForm from "../components/SubscrimeForm.jsx";
import { addSubscribe } from "../redux/subscriberSlice.js";

const mockStore = configureStore([]);
const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    }
})

describe("SubscribeForm", () => {
    it("render the input and submit button", () => {
        render(<SubscribeForm />)
        
        const inputElement = screen.getByPlaceholderText(/Enter your name/i);
        const buttonElement = screen.getByText(/subscribe/i);
        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    })

    it("updated the input values when typing", () => {
        render(<SubscribeForm />)
        const inputElement = screen.getByPlaceholderText(/Enter your name/i);
        fireEvent.change(inputElement, { target: { value: "Sai" } })
        expect(inputElement.value).toBe("Sai")
    })
    it("dispatches the action when form is submitted", () => {
        const store = mockStore();
        render(
            <Provider store={store}>
                <SubscribeForm />
            </Provider>
        )
        const inputElement = screen.getByPlaceholderText(/Enter your name/i);
        const buttonElement = screen.getByText(/subscribe/i);
        fireEvent.change(inputElement, { target: { value: "Sai" } });
        expect(inputElement.value).toBe("Sai");
        fireEvent.click(buttonElement);
        expect(mockDispatch).toHaveBeenCalledWith(addSubscribe("Sai"))
    })
})