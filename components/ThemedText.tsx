import { Text, type TextProps } from 'react-native';

import { cn } from '~/lib/utils';

type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'details';
};

export default function ThemedText({ className, type = 'default', ...rest }: ThemedTextProps) {
  const textStyles = cn({
    'text-label': true,
    'text-base': type === 'default' || type === 'defaultSemiBold',
    'font-semibold': type === 'defaultSemiBold',
    'text-2xl font-bold': type === 'title',
    'text-lg font-semibold': type === 'subtitle',
    'text-sm/10 text-link': type === 'link',
    'text-slate-700 dark:text-slate-400 text-sm': type === 'details',
    [`${className}`]: !!className,
  });

  return <Text className={textStyles} {...rest} />;
}
