import { i } from "@instantdb/react";

// Chat Extension Schema
const _schema = i.schema({
  entities: {
    messages: i.entity({
      text: i.string(),
      link: i.string().optional(),
      sender: i.string(),
      createdAt: i.number(),
    }),
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
  },
  links: {
    messageFile: {
      forward: { on: 'messages', has: 'one', label: '$file' },
      reverse: { on: '$files', has: 'many', label: 'messages' },
    },
  },
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
