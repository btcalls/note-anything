import { QueryData } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';
import { supabase } from '~/lib/supabase';
import { ArrayElement, getItemLayout } from '~/lib/utils';

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
        <ThemedView className="flex-row items-center justify-between">
          <ThemedText type="title">{item.name}</ThemedText>
          <ThemedText className="color-slate-500 text-sm">
            {new Date(item.modified_at).toLocaleDateString()}
          </ThemedText>
        </ThemedView>

        <ThemedView className="mt-2 flex-row flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Text
              key={tag.name}
              className="px-2 py-1 rounded-md color-white bg-red-400 dark:bg-red-500 w-fit font-medium"
            >
              {tag.name}
            </Text>
          ))}
        </ThemedView>
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
    <SafeAreaProvider>
      <FlatList
        contentContainerClassName="gap-3"
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
        // Optimize FlatList performance
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={(_, index) => getItemLayout(ITEM_HEIGHT, index)}
      />
    </SafeAreaProvider>
  );
}
