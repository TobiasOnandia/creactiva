import { Layout } from 'react-grid-layout';

export type GridLayout = Layout & {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minH?: number;
  minW?: number;
  static?: boolean;
  isDraggable?: boolean;
};
