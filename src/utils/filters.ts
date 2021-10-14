import { FilterRangeProps } from '../molecules/filter-range';
import { filtersData } from '../picture/filters';

export const initializeFilterValues = (): FilterRangeProps[] => {
	return filtersData.reduce((acc, curr) => {
		const { defaultValue, type } = curr;
		const newCurr = {
			...curr,
			currentType: type,
			currentValue: defaultValue ?? 0,
		} as FilterRangeProps;
		return [...acc, newCurr];
	}, [] as FilterRangeProps[]);
};

export const saveImageURLForDownload = (
	imageDOMElement: HTMLImageElement
): string => {
	const canvasDOM = document.createElement('canvas') as HTMLCanvasElement;
	canvasDOM.height = imageDOMElement.height;
	canvasDOM.width = imageDOMElement.width;

	const ctx = canvasDOM.getContext('2d') as CanvasRenderingContext2D;
	ctx.filter = imageDOMElement.style.filter;
	ctx.drawImage(imageDOMElement, 0, 0, canvasDOM.width, canvasDOM.height);

	return canvasDOM.toDataURL('image/jpeg');
};
