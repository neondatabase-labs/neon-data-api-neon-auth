export type Note = {
  id: string;
  title: string;
  created_at: string;
  shared: boolean;
  owner_id: string;
};

export type Paragraph = {
  id: string;
  note_id: string;
  content: string;
  created_at: string;
};

export type NoteWithParagraphs = Note & {
  paragraphs: Paragraph[];
};
