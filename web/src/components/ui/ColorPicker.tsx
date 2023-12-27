import React from "react";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker = ({
  colors,
  selectedColor,
  onColorSelect,
}: ColorPickerProps) => {
  const handleColorClick = (color: string) => {
    onColorSelect(color);
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color}
          className={`h-10 w-10 rounded-full cursor-pointer ${
            selectedColor === color
              ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-white"
              : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
          type="button"
          aria-label={`Select ${color}`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
