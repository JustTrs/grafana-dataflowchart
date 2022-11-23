type Orientation = 'LR' | 'TB';

export interface SimpleOptions {
  from: string,
  orientation: Orientation,
  text: string,
  to: string
}
