import { QueryData } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';
import { supabase } from '~/lib/supabase';
import { ArrayElement } from '~/lib/utils';

export default function HomeScreen() {
  const ITEM_HEIGHT = 300;

  const listsQuery = supabase.from('lists').select(`
    id,
    name,
    tags (
      name
    ),
    modified_at
  `);

  type ListsQuery = QueryData<typeof listsQuery>;
  type List = ArrayElement<ListsQuery>;

  const [data, setData] = useState<ListsQuery>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: lists, error } = await listsQuery;

        if (error) {
          setError(error.message);
          return;
        }

        if (lists && lists.length > 0) {
          setData(lists);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: List }) => (
      <ThemedView className="p-4">
        <ThemedText type="title">{item.name}</ThemedText>
        {item.tags && item.tags.length > 0 && (
          <ThemedText type="subtitle">
            Tags: {item.tags.map((tag) => tag.name).join(', ')}
          </ThemedText>
        )}
        <ThemedText>Last Modified: {new Date(item.modified_at).toLocaleString()}</ThemedText>
      </ThemedView>
    ),
    []
  );

  if (loading) {
    return <ActivityIndicator className="h-full" size="large" />;
  }

  if (error) {
    return <ThemedText>Error: {error}</ThemedText>;
  }

  return (
    <FlatList
      contentContainerClassName="gap-3"
      data={data}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      // Optimize FlatList performance
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
    />
  );
}
