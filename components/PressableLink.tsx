import { Href, Link } from 'expo-router';
import { Pressable, View, type ViewProps } from 'react-native';

import { cn } from '~/lib/utils';

type Props = Pick<ViewProps, 'children' | 'className'> & {
  href: Href;
};

export default function PressableLink({
  href,
  className,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Link href={href} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            className={cn({
              [`${className}`]: !!className,
              'bg-background': !pressed,
              'bg-background/80': pressed,
            })}
          >
            {children}
          </View>
        )}
      </Pressable>
    </Link>
  );
}
