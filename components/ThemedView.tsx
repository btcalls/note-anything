import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';

export function ThemedView({ className, ...otherProps }: ViewProps) {
  const viewStyles = cn({
    'bg-background': true,
    [`${className}`]: !!className,
  });

  return <View className={viewStyles} {...otherProps} />;
}
