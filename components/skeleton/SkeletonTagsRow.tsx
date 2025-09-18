import { View } from 'react-native';

import type { SkeletonProps } from '~/constants/types';

export default function SkeletonTagsRow({ length = 2 }: SkeletonProps) {
  const data = Array.from({ length }, (_, index) => index);

  return (
    <View className="flex-1 gap-2">
      <View className="h-7 w-32 skeleton" />
      <View className="w-full flex-row flex-wrap items-start gap-4">
        {data.map((i) => (
          <View key={`${i}`} className="h-12 w-20 skeleton" />
        ))}
      </View>
    </View>
  );
}
