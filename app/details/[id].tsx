import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';

import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';
import { NoteItem, useGetListNotesQuery } from '~/lib/supabase/supabaseAPI';
import { getItemLayout } from '~/lib/utils';

const ITEM_HEIGHT = 100;

export default function DetailsScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { data: list, refetch, error, isLoading, isFetching } = useGetListNotesQuery(Number(id));

  useEffect(() => {
    if (list) {
      navigation.setOptions({ title: list.name });
    }
  }, [list]);

  const renderItem = useCallback(
    ({ item }: { item: NoteItem }) => (
      <ThemedView className="p-4 border-b-[1px] border-slate-500/30">
        <ThemedText type="subtitle">{item.label}</ThemedText>
        <ThemedText type="details">Details here</ThemedText>
      </ThemedView>
    ),
    []
  );

  if (isLoading) {
    return <ActivityIndicator className="h-full" size="large" />;
  }

  if (error as string) {
    return <ThemedText>Failed fetching list details.</ThemedText>;
  }

  return (
    <FlatList
      contentContainerClassName="mt-4"
      data={list?.notes}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      refreshing={isFetching}
      // Optimize FlatList performance
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      getItemLayout={(_, index) => getItemLayout(ITEM_HEIGHT, index)}
      removeClippedSubviews
    />
  );
}
