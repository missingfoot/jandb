import { useState, useRef } from 'react';

interface ThemePickerProps {
  currentColor: string;
  defaultColor: string;
  customColors: string[];
  onColorChange: (color: string) => void;
  onReset: () => void;
  onSaveCustomColor: (color: string) => void;
  onClearCustomColors: () => void;
}

const PRESET_COLORS = [
  '#0d6efd', // Default blue
  '#3b82f6', // Sky blue
  '#06b6d4', // Cyan
  '#14b8a6', // Teal
  '#10b981', // Emerald
  '#84cc16', // Lime
  '#eab308', // Amber
  '#f97316', // Orange
  '#ef4444', // Red
  '#ec4899', // Pink
  '#d946ef', // Fuchsia
  '#a855f7', // Purple
  '#8b5cf6', // Violet
  '#6366f1', // Indigo
  '#64748b', // Slate
  '#78716c', // Stone
];

export function ThemePicker({ currentColor, defaultColor, customColors, onColorChange, onReset, onSaveCustomColor, onClearCustomColors }: ThemePickerProps) {
  const [hexInput, setHexInput] = useState(currentColor);
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const isCustomColor = !PRESET_COLORS.includes(currentColor) && !customColors.includes(currentColor);

  const handleSaveCustomColor = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(currentColor)) {
      onSaveCustomColor(currentColor);
    }
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onColorChange(value);
    }
  };

  const handlePresetClick = (color: string) => {
    setHexInput(color);
    onColorChange(color);
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setHexInput(color);
    onColorChange(color);
  };

  const handleSwatchClick = () => {
    colorPickerRef.current?.click();
  };

  return (
    <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-neutral-400">Theme Color</p>
        <div className="flex items-center gap-2">
          {isCustomColor && (
            <button
              onClick={handleSaveCustomColor}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Save to Custom
            </button>
          )}
          {currentColor !== defaultColor && (
            <button
              onClick={onReset}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Reset to default
            </button>
          )}
        </div>
      </div>

      {/* Color preview */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 flex-shrink-0">
          <input
            ref={colorPickerRef}
            type="color"
            value={currentColor}
            onChange={handleColorPickerChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none"
            style={{ backgroundColor: currentColor }}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#0d6efd"
            className="w-full h-10 px-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white text-sm font-mono focus:outline-none focus:border-[rgba(255,255,255,0.4)]"
          />
        </div>
      </div>

      {/* Preset colors */}
      <p className="text-xs text-neutral-400 mb-2">Presets</p>
      <div className="grid grid-cols-8 gap-1.5 mb-4">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => handlePresetClick(color)}
            className="w-full aspect-square rounded-md border-2 transition-all hover:scale-110"
            style={{
              backgroundColor: color,
              borderColor: currentColor === color ? 'white' : 'rgba(255,255,255,0.2)',
            }}
            aria-label={`Select ${color}`}
          />
        ))}
      </div>

      {/* Custom colors */}
      {customColors.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-neutral-400">Custom</p>
            <button
              onClick={onClearCustomColors}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-8 gap-1.5">
            {customColors.map((color) => (
              <button
                key={color}
                onClick={() => handlePresetClick(color)}
                className="w-full aspect-square rounded-md border-2 transition-all hover:scale-110"
                style={{
                  backgroundColor: color,
                  borderColor: currentColor === color ? 'white' : 'rgba(255,255,255,0.2)',
                }}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
