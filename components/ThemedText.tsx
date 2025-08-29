import { Text, type TextProps } from 'react-native';

import { cn } from '@/lib/utils';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ className, type = 'default', ...rest }: ThemedTextProps) {
  const textStyles = cn({
    'text-label': true,
    'text-base': type === 'default' || type === 'defaultSemiBold',
    'font-semibold': type === 'defaultSemiBold',
    'text-3xl font-bold': type === 'title',
    'text-xl font-bold': type === 'subtitle',
    'text-sm/10 text-link': type === 'link',
    [`${className}`]: !!className,
  });

  return <Text className={textStyles} {...rest} />;
}
