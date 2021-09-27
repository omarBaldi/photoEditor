import { FilterType } from '../molecules/filter-range/dto';

export const filtersData = [
  {
    labelName: 'Brightness',
    rangeName: 'brightness',
    type: FilterType.BRIGHTNESS,
    defaultValue: 100,
    maxValue: 200,
  },
  {
    labelName: 'Sepia',
    rangeName: 'sepia',
    type: FilterType.SEPIA,
  },
  {
    labelName: 'Contrast',
    rangeName: 'contrast',
    type: FilterType.CONTRAST,
    defaultValue: 100,
  },
  {
    labelName: 'Grayscale',
    rangeName: 'grayscale',
    type: FilterType.GRAYSCALE,
  },
  {
    labelName: 'Opacity',
    rangeName: 'opacity',
    type: FilterType.OPACITY,
    defaultValue: 100,
  },
  {
    labelName: 'Blur',
    rangeName: 'blur',
    type: FilterType.BLUR,
  },
  {
    labelName: 'Saturate',
    rangeName: 'saturate',
    type: FilterType.SATURATE,
    defaultValue: 100,
  },
];
