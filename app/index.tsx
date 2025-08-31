import { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';
import { ListItem, useGetListsQuery } from '~/lib/supabase/supabaseAPI';
import { getItemLayout } from '~/lib/utils';

export default function HomeScreen() {
  const ITEM_HEIGHT = 300;

  const { data, error, isLoading } = useGetListsQuery();

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => (
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

  if (isLoading) {
    return <ActivityIndicator className="h-full" size="large" />;
  }

  if (error as string) {
    return <ThemedText>Failed fetching lists.</ThemedText>;
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
