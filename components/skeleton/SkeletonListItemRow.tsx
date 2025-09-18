import { View } from 'react-native';

import { LIST_ITEM_HEIGHT } from '~/lib/constants';
import { cn } from '~/lib/utils';

export function SkeletonListItemRow() {
  return (
    <View
      className={cn({
        'card justify-center': true,
        [`${LIST_ITEM_HEIGHT.className}`]: true,
      })}
    >
      <View className="flex-row items-center justify-between">
        <View className="skeleton h-8 w-2/4" />
        <View className="skeleton h-4 w-16" />
      </View>

      <View className="flex-row gap-2">
        <View className="skeleton h-6 w-20" />
        <View className="skeleton h-6 w-14" />
      </View>
    </View>
  );
}
