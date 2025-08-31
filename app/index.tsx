import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Tag } from '@/lib/models';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const ITEM_HEIGHT = 300;
  const [data, setData] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: tags, error } = await supabase.from('tag').select();

        if (error) {
          setError(error.message);
          return;
        }

        if (tags && tags.length > 0) {
          setData(tags);
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
    ({ item }: { item: Tag }) => (
      <ThemedView className="p-4">
        <ThemedText type="title">{item.name}</ThemedText>
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
