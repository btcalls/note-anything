import type { ListRenderItem } from 'react-native';
import { FlatList } from 'react-native';

import type { SkeletonProps } from '~/constants/types';

type Props = SkeletonProps & {
  renderItem: ListRenderItem<unknown>;
};

export default function SkeletonList({ length = 3, renderItem }: Props) {
  const data = Array.from({ length }, (_, index) => index);
  const numToRender = length < 10 ? length : 10;

  return (
    <FlatList
      contentContainerClassName="gap-4 mt-4"
      data={data}
      keyExtractor={(item) => `${item}`}
      renderItem={renderItem}
      contentInsetAdjustmentBehavior="automatic"
      // Optimize FlatList performance
      initialNumToRender={numToRender}
      maxToRenderPerBatch={numToRender}
      removeClippedSubviews
    />
  );
}
