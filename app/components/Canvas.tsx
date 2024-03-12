"use client";
import React, { useCallback } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import { Image as KonvaImage } from "react-konva";

const Canva = () => {
    const size = 500;
    const [image, setImage] = React.useState<HTMLImageElement>();
    const transformerRef = React.useRef<any>();
    const imageRef = React.useRef<any>();

    React.useEffect(() => {
        if (imageRef.current && image) {
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [image]);

    const onImageSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.[0]) {
                const imageURL = URL.createObjectURL(e.target.files[0]);
                const img = new Image();
                img.src = imageURL;
                setImage(img);
            }
        },
        []
    );
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <input
                type="file"
                accept="image/*"
                onChange={onImageSelect}
                className="mb-8"
            />
            <Stage
                width={window.innerWidth / 2}
                height={window.innerHeight}
                className="bg-white"
            >
                <Layer>
                    {image && (
                        <>
                            <KonvaImage
                                ref={imageRef}
                                image={image}
                                x={0}
                                y={0}
                                width={size / 2}
                                height={size / 2}
                                draggable
                            />
                            <Transformer ref={transformerRef} />
                        </>
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

export default Canva;
