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
      className="absolute bottom-14 right-6 z-10 rounded-full bg-brand p-4 text-xl shadow"
      onPress={onPress}
    >
      <IconSymbol name={icon} size={30} color={tint} />
    </TouchableOpacity>
  );
}
