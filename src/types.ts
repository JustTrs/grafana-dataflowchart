type Orientation = 'LR' | 'TB';

export interface SimpleOptions {
  from: string,
  orientation: Orientation,
  subgraph: string,
  text: string,
  to: string
}
