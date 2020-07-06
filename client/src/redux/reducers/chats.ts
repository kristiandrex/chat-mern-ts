import { Chat, ActionI, Current } from "../../react-app-env";
import addMessage from "../helpers/addMessage";

interface ChatState {
    collection: Chat[];
    current: Current;
}

const initialState: ChatState = {
    collection: [],
    current: {
        user: null,
        chat: null
    }
}

export default function reducer(state: ChatState = initialState, action: ActionI): ChatState {
    switch (action.type) {
        case 'SET_USER': {
            return {
                current: {
                    chat: null,
                    user: null
                },
                collection: action.payload.chats
            };
        }

        case 'SIGNIN': {
            return action.payload.user.chats;
        }

        case 'SIGNOUT': {
            return initialState;
        }

        case 'SET_CURRENT_CHAT': {
            let collection: Chat[] = state.collection;

            const index: number = action.payload.index;

            if (collection[index].unread > 0) {
                collection = state.collection.slice();
                collection[index].unread = 0;
            }

            return {
                current: {
                    user: null,
                    chat: action.payload
                },
                collection
            };
        }

        case 'SET_CURRENT_USER': {
            return {
                ...state,
                current: {
                    user: action.payload,
                    chat: null
                }
            }
        }

        case 'CLOSE_CURRENT': {
            return {
                ...state,
                current: {
                    user: null,
                    chat: null
                }
            }
        }

        case 'ADD_CHAT': {
            return {
                ...state,
                collection: [
                    action.payload,
                    ...state.collection
                ]
            };
        }

        case 'DELETE_CHAT': {
            const collection = state.collection.slice();
            const deleted = collection.splice(action.payload, 1)[0];

            if (deleted._id === state.current.chat?._id) {
                return {
                    current: {
                        chat: null,
                        user: null
                    },
                    collection
                };
            }

            return {
                ...state,
                collection
            };
        }

        case 'ADD_MESSAGE': {
            const collection = addMessage(state.collection, action.payload);
            collection[0].unread += 1;

            return {
                ...state,
                collection
            };
        }

        case 'ADD_CURRENT_MESSAGE': {
            const collection = addMessage(state.collection, action.payload);
            const chat = Object.assign({}, collection[0]);

            return {
                collection,
                current: {
                    user: null,
                    chat
                }
            };
        }

        default:
            return state;
    }
};