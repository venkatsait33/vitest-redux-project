import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Sidebar from "../components/Sidebar";
import { fireEvent, render, screen } from "@testing-library/react";
import { addSubscribe } from "../redux/subscriberSlice";

const mockStore = configureStore([]);

describe("Testing the SideBar Components of Comments and Subscribes", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            comment: {
                comments: ["1st comt", "2nd comt", "3rd comt"]
            },
            subscribe: { subscribes: ["user1", "user2", "user3"] }
        })
        store.dispatch = vi.fn();
    })

    it("render comments and subscribers correctly", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        )
        expect(screen.getByText("1st comt")).toBeInTheDocument();
        expect(screen.getByText("user1")).toBeInTheDocument();

    })

    it("Clear all comments when the 'clear' button is clicked", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        )
        const clearButton = screen.getByText("Clear", {
            selector: ".button"
        })
        fireEvent.click(clearButton);
        expect(store.dispatch).toHaveBeenCalledWith({ type: "comment/clearComments" });
    })

    it("Delete a specific comment when the 'delete' button is clicked", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        )
        const deleteButton = screen.getAllByText("Delete", { selector: ".btn-error" });
        fireEvent.click(deleteButton[0]);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: "comment/deleteComment", payload: 0
        })
    })

    it("updates subscribers dynamically when a new subscriber is added", () => {
       
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        )
        store.dispatch(addSubscribe("new user"));
        expect(store.dispatch).toHaveBeenCalledWith({ type: "subscribe/addSubscribe", payload: "new user" });
        
        const updateState = {
            comment: { comments: [] },
            subscribe: { subscribes: ["new user"] }
        };
        store = mockStore(updateState);
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        )
        expect(screen.getByText("new user")).toBeInTheDocument();
    })
    


});

