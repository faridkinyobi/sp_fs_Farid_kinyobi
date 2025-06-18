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
  options?: { id: string | number | undefined; email: string }[];
  defaultValue?: string;
}

export default function SelectMember(props: SelectProps) {
  const { onValueChange, options, defaultValue } = props;
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger
        className={`text-sm font-normal bg-input w-full text-[#111827] `}
        aria-label='Select Member Email'
      >
        <SelectValue
          placeholder="Select Member"
          className="placeholder:text-[#111827] placeholder:text-sm"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.isArray(options) &&
            options.map((items) => (
              <SelectItem
                key={items.id}
                value={items.id !== undefined ? String(items.id) : ''}
                aria-label={items.email}
              >
                {items.email}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
