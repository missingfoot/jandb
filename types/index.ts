import type { AppSchema } from '@/instant.schema';
import type { InstaQLEntity } from '@instantdb/react';

export type Message = InstaQLEntity<AppSchema, 'messages'>;
export type InstantFile = InstaQLEntity<AppSchema, '$files'>;
export type TabType = 'chat' | 'links' | 'images' | 'files' | 'settings';

export interface MessageWithFile extends Message {
  $file?: InstantFile;
}
