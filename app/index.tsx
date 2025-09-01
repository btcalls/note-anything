import { useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ListItemRow from '~/components/app/ListItemRow';

import { ThemedText } from '~/components/ThemedText';
import { ListItem, useGetListsQuery } from '~/lib/supabase/supabaseAPI';
import { getItemLayout } from '~/lib/utils';

export default function HomeScreen() {
  const ITEM_HEIGHT = 300;

  const { data, error, isLoading } = useGetListsQuery();

  const renderItem = useCallback(({ item }: { item: ListItem }) => <ListItemRow item={item} />, []);

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
