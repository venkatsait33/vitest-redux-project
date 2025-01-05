import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { vi } from "vitest";
import Navbar from "../components/Navbar";
import PostDisplay from "../components/PostDisplay"; // Component with like/dislike buttons
import Sidebar from "../components/Sidebar"; // Component with comments/subscribers management
import {
    addLike,
    disLike,
} from "../redux/likesSlice";
import { addSubscribe } from "../redux/subscriberSlice";
import { addComment } from "../redux/commentsSlice";

describe("Navbar Component", () => {
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

    it("updates the store and displays the correct like count when like button is clicked", () => {
        render(
            <Provider store={store}>
                <Navbar />
                <PostDisplay />
            </Provider>
        );

        // Dispatch like action
        store.dispatch(addLike());

        // Update the mock store
        const updatedState = {
            likes: { likes: 1, dislikes: 0 },
            comment: { comments: [] },
            subscribe: { subscribes: [] },
        };
        store = mockStore(updatedState);

        // Re-render the Navbar with the updated store
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );

        // Assert that the like count is updated
        expect(screen.getByText("likes: 1")).toBeInTheDocument();
    });

    it("updates the store and displays the correct dislike count when dislike button is clicked", () => {
        render(
            <Provider store={store}>
                <Navbar />
                <PostDisplay />
            </Provider>
        );

        // Dispatch dislike action
        store.dispatch(disLike());

        // Update the mock store
        const updatedState = {
            likes: { likes: 0, dislikes: 1 },
            comment: { comments: [] },
            subscribe: { subscribes: [] },
        };
        store = mockStore(updatedState);

        // Re-render the Navbar with the updated store
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );

        // Assert that the dislike count is updated
        expect(screen.getByText("DisLikes: 1")).toBeInTheDocument();
    });

    it("updates the store and displays the correct comment count when a comment is added", () => {
        render(
            <Provider store={store}>
                <Navbar />
                <Sidebar />
            </Provider>
        );

        // Dispatch add comment action
        store.dispatch(addComment("New Comment"));

        // Update the mock store
        const updatedState = {
            likes: { likes: 0, dislikes: 0 },
            comment: { comments: ["New Comment"] },
            subscribe: { subscribes: [] },
        };
        store = mockStore(updatedState);

        // Re-render the Navbar with the updated store
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );

        // Assert that the comment count is updated
        expect(screen.getByText("Comments: 1")).toBeInTheDocument();
    });

    it("updates the store and displays the correct subscriber count when a subscriber is added", () => {
        render(
            <Provider store={store}>
                <Navbar />
                <Sidebar />
            </Provider>
        );

        // Dispatch add subscriber action
        store.dispatch(addSubscribe("New Subscriber"));

        // Update the mock store
        const updatedState = {
            likes: { likes: 0, dislikes: 0 },
            comment: { comments: [] },
            subscribe: { subscribes: ["New Subscriber"] },
        };
        store = mockStore(updatedState);

        // Re-render the Navbar with the updated store
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );

        // Assert that the subscriber count is updated
        expect(screen.getByText("Subscribers: 1")).toBeInTheDocument();
    });
});
