import { useAppStore } from '../../store/appStore';
import Toggle, { type IToggleOption } from './Toggle';
import type { TUnits } from '../../types/weather';
import { getSetUnits, getUnits } from '../../store/appSelectors';

const unitsOptions: IToggleOption<TUnits>[] = [
  { label: '°C', value: 'celsius' },
  { label: '°F', value: 'fahrenheit' },
];

export default function ToggleUnits() {
  const units = useAppStore(getUnits);
  const setUnits = useAppStore(getSetUnits);

  return (
    <Toggle
      label="Units"
      value={units}
      options={unitsOptions}
      onChange={setUnits}
    />
  );
}
