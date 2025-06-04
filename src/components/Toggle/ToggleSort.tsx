import { useAppStore } from '../../store/appStore';
import Toggle, { type IToggleOption } from './Toggle';
import { getSetSort, getSort } from '../../store/appSelectors';

export type TSortOption = 'name' | 'distance';

const sortOptions: IToggleOption<TSortOption>[] = [
  { label: 'Name', value: 'name' },
  { label: 'Distance', value: 'distance' },
];

export default function ToggleSort() {
  const sort = useAppStore(getSort);
  const setSort = useAppStore(getSetSort);

  return (
    <Toggle
      label="Sort by"
      value={sort}
      options={sortOptions}
      onChange={setSort}
    />
  );
}
