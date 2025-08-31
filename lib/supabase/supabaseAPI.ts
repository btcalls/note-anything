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
  }),
});

// Export custom query single item types
export type ListItem = ArrayElement<ListsQuery>;

export const { useGetListsQuery } = supabaseApi;
