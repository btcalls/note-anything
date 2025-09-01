import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryData } from '@supabase/supabase-js';

import { ArrayElement } from '../utils';
import { supabase } from './supabaseClient';

// Define reusable queries
const listsQuery = supabase.from('lists').select(`
  id,
  name,
  tags (
    name
  ),
  modified_at
`);
const notesQuery = (listId: number) =>
  supabase
    .from('lists')
    .select(
      `
      id,
      name,
      notes (
        id,
        label,
        rank,
        modified_at
      )
    `
    )
    .eq('id', listId);

type ListsQuery = QueryData<typeof listsQuery>;

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getLists: builder.query<ListsQuery, void>({
      queryFn: async () => {
        const { data, error } = await listsQuery;

        if (error) {
          return { error };
        }

        return { data };
      },
    }),
    getListNotes: builder.query<ListNotesItem | null, number>({
      queryFn: async (listId) => {
        const { data, error } = await notesQuery(listId);

        if (error) {
          return { error };
        }

        if (data && data.length > 0) {
          return { data: data[0] };
        }

        return { data: null };
      },
    }),
  }),
});

// Export custom query single item types
export type ListItem = ArrayElement<ListsQuery>;
export type NoteItem = ListNotesItem['notes'][0];
export type ListNotesItem = {
  id: number;
  name: string;
  notes: {
    id: number;
    label: string;
    rank: number;
    modified_at: string;
  }[];
};

export const { useGetListsQuery, useGetListNotesQuery } = supabaseApi;
