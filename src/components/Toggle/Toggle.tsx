import React from 'react';
import styles from './Toggle.module.css';
import Label from '../Label/Label';

export interface IToggleOption<T extends string> {
  label: string;
  value: T;
}

interface IToggleProps<T extends string> {
  label: string;
  value: T;
  options: IToggleOption<T>[];
  onChange: (value: T) => void;
}

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: IToggleProps<T>) {
  return (
    <div className={styles.wrapper}>
      <Label>{label}</Label>
      <div className={styles.options}>
        {options.map((option, i) => (
          <React.Fragment key={option.value}>
            <button
              type="button"
              className={`${styles.option} ${
                value === option.value ? styles.active : ''
              }`}
              onClick={() => onChange(option.value)}
              aria-current={value === option.value}
            >
              {option.label}
            </button>
            {i !== options.length - 1 && (
              <span className={styles.separator}>|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Toggle;
