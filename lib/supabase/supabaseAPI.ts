import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryData } from '@supabase/supabase-js';

import { ListFormData } from '~/app/lists/new';

import { ArrayElement } from '../utils';

import { supabase } from './supabaseClient';

// Define reusable queries
const listsQuery = supabase
  .from('lists')
  .select(
    `
    id,
    name,
    tags (
      id,
      name
    ),
    modified_at
  `
  )
  .order('modified_at', { ascending: false });
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
        modified_at,
        latest_detail:details!inner (
          description,
          created_at
        )
      )
    `
    )
    .eq('id', listId)
    .order('created_at', { referencedTable: 'notes.latest_detail', ascending: false })
    .limit(1, { foreignTable: 'notes.latest_detail' })
    .single();
const tagsQuery = supabase.from('tags').select('*');

type ListsQuery = QueryData<typeof listsQuery>;
type ListNotesItem = {
  id: number;
  name: string;
  notes: {
    id: number;
    label: string;
    rank: number;
    modified_at: string;
    latest_detail: {
      description: string;
      created_at: string;
    };
  }[];
};
type TagsQuery = QueryData<typeof tagsQuery>;

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery<SupabaseQueryError>(),
  endpoints: (builder) => ({
    // Mutations
    logIn: builder.mutation<boolean, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error: { code: `${error.status}`, message: error.message } };
        }

        return { data: true };
      },
    }),
    createList: builder.mutation<boolean, ListFormData>({
      queryFn: async ({ name: p_name, tags: p_tag_ids }) => {
        const { error } = await supabase.rpc('create_list_with_tags', {
          p_name,
          p_tag_ids,
        });

        // Handle RPC error (permission, validation, etc.)
        if (error) {
          return { error: { code: `${error.code}`, message: error.message } };
        }

        return { data: true };
      },
    }),

    // Queries
    getLists: builder.query<ListsQuery, void>({
      queryFn: async () => {
        const { data, error } = await listsQuery;

        if (error) {
          return { error: { code: error.code, message: error.message } };
        }

        return { data };
      },
    }),
    getListNotes: builder.query<ListNotesItem, number>({
      queryFn: async (listId) => {
        const { data, error } = await notesQuery(listId);

        if (error) {
          return { error: { code: error.code, message: error.message } };
        }

        // Transform the data to take first item from latest_detail array
        const notes = data.notes.map((note) => ({
          ...note,
          latest_detail: note.latest_detail[0],
        }));

        return { data: { ...data, notes } };
      },
    }),
    getTags: builder.query<TagsQuery, void>({
      queryFn: async () => {
        const { data, error } = await tagsQuery;

        if (error) {
          return { error: { code: error.code, message: error.message } };
        }

        return { data };
      },
    }),
  }),
});

// Export custom query single item types
export type SupabaseQueryError = { code: string; message: string };
export type ListItem = ArrayElement<ListsQuery>;
export type NoteItem = ListNotesItem['notes'][0];
export type TagItem = ArrayElement<TagsQuery>;

export const {
  useLogInMutation,
  useCreateListMutation,
  useGetListsQuery,
  useGetListNotesQuery,
  useGetTagsQuery,
} = supabaseApi;
