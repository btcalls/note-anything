import { useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import ListItemRow from '~/components/app/ListItemRow';
import { ThemedText } from '~/components/ThemedText';
import { ListItem, useGetListsQuery } from '~/lib/supabase/supabaseAPI';
import { getItemLayout } from '~/lib/utils';

const ITEM_HEIGHT = 300;

export default function HomeScreen() {
  const { data, error, isLoading } = useGetListsQuery();

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => (
      <ListItemRow className="p-4 mx-2 rounded-lg shadow-sm shadow-label/35" item={item} />
    ),
    []
  );

  if (isLoading) {
    return <ActivityIndicator className="h-full" size="large" />;
  }

  if (error) {
    return <ThemedText>{error.message ?? 'Failed fetching lists.'}</ThemedText>;
  }

  return (
    <FlatList
      contentContainerClassName="gap-3 mt-4"
      data={data}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      contentInsetAdjustmentBehavior="automatic"
      // Optimize FlatList performance
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      getItemLayout={(_, index) => getItemLayout(ITEM_HEIGHT, index)}
      removeClippedSubviews
    />
  );
}
