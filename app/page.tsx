import NoteList from "./components/NoteList";
import ExportButton from "./components/ExportButton";

export default function Home() {
  return (
    <main>
      <h1>Full Notes List:</h1>
      <ExportButton />
      <NoteList />
    </main>
  );
}