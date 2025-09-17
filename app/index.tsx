import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList } from 'react-native';

import BottomRightButton from '~/components/BottomRightButton';
import { ThemedText } from '~/components/ThemedText';
import ListItemRow, { SkeletonListItemRow } from '~/components/lists/ListItemRow';
import SkeletonList from '~/components/skeleton/SkeletonList';
import { LIST_ITEM_HEIGHT } from '~/lib/constants';
import type { ListItem } from '~/lib/supabase/supabaseAPI';
import { useGetListsQuery } from '~/lib/supabase/supabaseAPI';
import { getItemLayout } from '~/lib/utils';

export default function HomeScreen() {
  const { data, error, isLoading } = useGetListsQuery();
  const router = useRouter();

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => (
      <ListItemRow className={LIST_ITEM_HEIGHT.className} item={item} />
    ),
    []
  );
  const renderSkeleton = useCallback(() => <SkeletonListItemRow />, []);

  if (isLoading) {
    return <SkeletonList length={2} renderItem={renderSkeleton} />;
  }

  // TODO: Error screen
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
        getItemLayout={(_, index) => getItemLayout(LIST_ITEM_HEIGHT.value, index)}
        removeClippedSubviews
      />

      <BottomRightButton icon="plus" onPress={() => router.navigate('/lists/new')} />
    </>
  );
}
