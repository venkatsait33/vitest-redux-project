import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SubscribeForm from "../SubscribeForm";
import { addSubscribe } from "../redux/subscriberSlice";

const mockStore = configureStore([]);
const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    };
});

describe("SubscribeForm", () => {
    it("renders the input and submit button", () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <SubscribeForm />
            </Provider>
        );

        // Check if input and button are rendered
        const inputElement = screen.getByPlaceholderText(/Enter your subscription/i); // Adjust placeholder text as per the Input component
        const buttonElement = screen.getByText(/Subscribe/i);

        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it("updates the input value when typing", () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <SubscribeForm />
            </Provider>
        );

        const inputElement = screen.getByPlaceholderText(/Enter your subscription/i);
        fireEvent.change(inputElement, { target: { value: "test@example.com" } });

        expect(inputElement.value).toBe("test@example.com");
    });

    it("dispatches addSubscribe action on form submission", () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <SubscribeForm />
            </Provider>
        );

        const inputElement = screen.getByPlaceholderText(/Enter your subscription/i);
        const buttonElement = screen.getByText(/Subscribe/i);
        // Simulate typing in the input field
        fireEvent.change(inputElement, { target: { value: "test@example.com" } });
        expect(inputElement.value).toBe("test@example.com");
        // Simulate form submission
        fireEvent.click(buttonElement);
        // Check if dispatch was called with correct action
        expect(mockDispatch).toHaveBeenCalledWith(addSubscribe("test@example.com"));
    });

    it("clears the input field after submission", () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <SubscribeForm />
            </Provider>
        );
        const inputElement = screen.getByPlaceholderText(/Enter your subscription/i);
        const buttonElement = screen.getByText(/Subscribe/i);
        // Simulate typing in the input field
        fireEvent.change(inputElement, { target: { value: "test@example.com" } });
        expect(inputElement.value).toBe("test@example.com");
        // Simulate form submission
        fireEvent.click(buttonElement);
        // Check if input is cleared
        expect(inputElement.value).toBe("");
    });
});
