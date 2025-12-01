export type BoundingBox = {
    type: 'bounding-box';
    x: number;
    y: number;
    width: number;
    height: number;
};
export interface OrientedBoundingBox {
    type: 'oriented-bounding-box';
    cx: number;
    cy: number;
    width: number;
    height: number;
    angle: number; //degrees
}
export type Circle = { type: 'circle'; cx: number; cy: number; r: number };
export type Point = { x: number; y: number };
export type Polygon = {
    type: 'polygon';
    points: Array<Point>;
};

export type Shape = BoundingBox | Polygon | Circle | OrientedBoundingBox;

export type Label = { id: string; name: string; color: string; isPrediction: boolean; score?: number };

export type Annotation = {
    id: string;
    shape: Shape;
    labels: Array<Label>;
};

export type AnnotationState = {
    isHovered: boolean;
    isSelected: boolean;
    isHidden: boolean;
    isLocked: boolean;
};
