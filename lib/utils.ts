import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Functions

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getItemLayout(height: number, index: number) {
  return { length: height, offset: height * index, index };
}

// Types

// Based on the suggested answer: https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
