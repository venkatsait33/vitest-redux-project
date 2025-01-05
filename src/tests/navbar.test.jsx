import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "../components/Navbar";
import PostDisplay from "../components/PostDisplay";
import { addLike } from "../redux/likesSlice";
import FormInput from "../components/FormInput";
import { addComment } from "../redux/commentsSlice";

describe("Testing Navbar Components", () => {
    let mockStore;
    let store;

    beforeEach(() => {
        mockStore = configureStore([]);
        store = mockStore({
            likes: { likes: 0, dislikes: 0 },
            comment: { comments: [] },
            subscribe: { subscribes: [] },
        });
        store.dispatch = vi.fn();
    });

    it("When click on like button, the like count should be incremented in store and navbar should be updated and displayed", () => {
        render(
            <Provider store={store}>
                <Navbar />
                <PostDisplay />
            </Provider>
        );
        store.dispatch(addLike())

        const updateState = {
            likes: { likes: 1, dislikes: 0 },
            comment: { comments: [] },
            subscribe: { subscribers: [] }
        };
        store = mockStore(updateState);
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        )
        expect(screen.getByText("likes: 1")).toBeInTheDocument();

    })

    it("add a comment and check the comments number in navbar is updated or not", () => {
        render(
            <Provider store={store}>
                <Navbar />
                <FormInput />
            </Provider>
        )
        store.dispatch(addComment("hello"));

        const updateState = {
            likes: { likes: 0, dislikes: 0 },
            comment: { comments: ["hello"] },
            subscribe: { subscribers: [] }
        };
        store = mockStore(updateState);
        render(
            <Provider store={store} >
                <Navbar />
            </Provider>)
        expect(screen.getByText("Comments: 1")).toBeInTheDocument();

    })

})