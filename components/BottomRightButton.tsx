import { SFSymbol } from 'expo-symbols';
import { TouchableOpacity } from 'react-native';

import useAppColor from '~/hooks/useAppColor';

import { IconSymbol } from './ui/IconSymbol';

type Props = {
  icon: SFSymbol;
  onPress: () => void;
};

export default function BottomRightButton({ icon, onPress }: Props) {
  const tint = useAppColor('secondaryForeground');

  return (
    <TouchableOpacity
      className="rounded-full p-4 text-xl bg-brand z-10 absolute bottom-14 right-6 shadow"
      onPress={onPress}
    >
      <IconSymbol name={icon} size={30} color={tint} />
    </TouchableOpacity>
  );
}
