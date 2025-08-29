import type { PropsWithChildren, ReactElement } from 'react';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { cn } from '@/lib/utils';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBGClassName?: string;
}>;

export default function ParallaxScrollView({ children, headerImage, headerBGClassName }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: HEADER_HEIGHT,
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });
  const headerBGStyles = cn('overflow-hidden', headerBGClassName);

  return (
    <ThemedView className="flex-1">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View className={headerBGStyles} style={headerAnimatedStyle}>
          {headerImage}
        </Animated.View>
        <ThemedView className="flex-1 p-8 gap-4 overflow-hidden">{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
