import AppRouter from "./AppRouter";
import Modal from "./components/Modal/Modal";
import ModalProvider from "./components/Modal/ModalContext";
import { PostsProvider } from "./components/Post/PostsContext";

function App() {
  return (
    <PostsProvider>
      <ModalProvider>
        <Modal />
        <AppRouter />
      </ModalProvider>
    </PostsProvider>
  );
}

export default App;
