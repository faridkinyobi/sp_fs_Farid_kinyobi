'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
interface SelectProps {
  onValueChange?: (value: string) => void;
  placeholder: string;
  options?: { name: string; value: string; id?: string }[];
  className?: string;
  classPlaceholder?: string;
  defaultValue?: string;
}
const option = [
  { name: 'Apple', value: 'apple', id: '1' },
  { name: 'Banana', value: 'banana', id: '2' },
  { name: 'Blueberry', value: 'blueberry', id: '3' },
  { name: 'Grapes', value: 'grapes', id: '4' },
  { name: 'Pineapple', value: 'pineapple', id: '5' },
];
export function SelectMolecul({
  onValueChange,
  placeholder,
  options = option,
  className,
  classPlaceholder = 'placeholder:text-[#111827] placeholder:text-sm',
  defaultValue,
}: SelectProps) {
  // console.log('SelectMolecul', options);
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className={`${className} text-sm font-normal bg-input `}>
        <SelectValue
          placeholder={placeholder}
          className={`${classPlaceholder} `}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => {
            const itemValue = option.id?.trim() || option.value?.trim();
            // if (!itemValue) return null;

            return (
              <SelectItem
                key={index}
                value={itemValue}
                aria-label={option.name}
              >
                {option.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
