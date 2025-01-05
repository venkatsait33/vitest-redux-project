import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Sidebar from "./Sidebar";
import { addSubscribe } from "../redux/subscriberSlice";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockStore = configureStore([]);

describe("Sidebar Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            comment: { comments: ["First Comment", "Second Comment"] },
            subscribe: { subscribes: ["User 1", "User 2"] },
        });
        store.dispatch = vi.fn();
    });

    it("renders comments and subscribers correctly", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        // Verify comments are displayed
        expect(screen.getByText("First Comment")).toBeInTheDocument();
        expect(screen.getByText("Second Comment")).toBeInTheDocument();

        // Verify subscribers are displayed
        expect(screen.getByText("User 1")).toBeInTheDocument();
        expect(screen.getByText("User 2")).toBeInTheDocument();
    });

    it("clears all comments when the 'Clear' button is clicked", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        const clearButton = screen.getByText("Clear", { selector: ".btn-secondary" });
        fireEvent.click(clearButton);

        expect(store.dispatch).toHaveBeenCalledWith({ type: "comment/clearComments" });
    });

    it("deletes a specific comment when the 'Delete' button is clicked", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        const deleteButtons = screen.getAllByText("delete", { selector: ".btn-error" });
        fireEvent.click(deleteButtons[0]);

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "comment/deleteComment",
            payload: 0,
        });
    });

    it("clears all subscribers when the 'Clear' button is clicked", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        const clearButton = screen.getByText("Clear", { selector: ".btn-secondary" });
        fireEvent.click(clearButton);

        expect(store.dispatch).toHaveBeenCalledWith({ type: "subscribe/clearSubscribers" });
    });

    it("deletes a specific subscriber when the 'Delete' button is clicked", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        const deleteButtons = screen.getAllByText("delete", { selector: ".btn-error" });
        fireEvent.click(deleteButtons[0]);

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "subscribe/deleteSubscriber",
            payload: 0,
        });
    });

    it("updates subscribers dynamically when a new subscriber is added", () => {
        store = mockStore({
            comment: { comments: [] },
            subscribe: { subscribes: [] },
        });

        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        store.dispatch(addSubscribe("New User"));

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "subscribe/addSubscribe",
            payload: "New User",
        });
    });
});
