import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import BottomRightButton from '~/components/BottomRightButton';
import ListItemRow from '~/components/ListItemRow';
import { ThemedText } from '~/components/ThemedText';
import { ListItem, useGetListsQuery } from '~/lib/supabase/supabaseAPI';
import { getItemLayout } from '~/lib/utils';

const ITEM_HEIGHT = 90;
// NOTE: Workaround for Tailwind CSS arbitrary value support.
// See https://v2.tailwindcss.com/docs/just-in-time-mode#arbitrary-value-support
const ITEM_HEIGHT_CLASS = 'min-h-[90px]';

export default function HomeScreen() {
  const { data, error, isLoading } = useGetListsQuery();
  const router = useRouter();

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => (
      <ListItemRow
        className={`p-4 mx-2 rounded-lg shadow-sm shadow-label/35 ${ITEM_HEIGHT_CLASS}`}
        item={item}
      />
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
    <>
      <FlatList
        contentContainerClassName="gap-4 mt-4"
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

      <BottomRightButton icon="plus" onPress={() => router.navigate('/lists/new')} />
    </>
  );
}
