import React from 'react';

interface BackgroundGradientProps {
  color1: string;
  color2: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'top right' | 'top left' | 'bottom right' | 'bottom left';
  id: number; // Accepts an id from 0 to 9 to select the gradient pattern
}

// Array of 10 unique clipPath patterns for different gradient shapes
const clipPathPatterns = [
  'polygon(90% 10%, 100% 30%, 85% 50%, 100% 70%, 80% 90%, 60% 85%, 50% 75%, 40% 90%, 20% 75%, 10% 50%)',
  'polygon(50% 0%, 100% 38%, 80% 100%, 0% 50%)',
  'polygon(20% 10%, 80% 0%, 100% 90%, 10% 100%)',
  'polygon(10% 0%, 100% 20%, 80% 80%, 0% 70%)',
  'polygon(30% 10%, 90% 30%, 70% 90%, 20% 60%)',
  'polygon(60% 10%, 90% 50%, 60% 100%, 10% 70%)',
  'polygon(90% 20%, 70% 40%, 100% 90%, 50% 60%)',
  'polygon(70% 10%, 90% 50%, 50% 100%, 10% 70%)',
  'polygon(30% 20%, 80% 30%, 60% 100%, 20% 80%)',
  'polygon(10% 10%, 90% 30%, 100% 90%, 20% 70%)',
];

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ color1, color2, position, id }) => {
  const selectedClipPath = clipPathPatterns[id % clipPathPatterns.length]; // Ensure valid id selection

  const getPositionStyles = () => {
    // Define styles based on the specified position
    const positionStyles: Record<string, React.CSSProperties> = {
      'top left': { top: 0, left: 0 },
      'top right': { top: 0, right: 0 },
      'bottom left': { bottom: 0, left: 0 },
      'bottom right': { bottom: 0, right: 0 },
      'top': { top: 0, left: '50%', transform: 'translateX(-50%)' },
      'bottom': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
      'left': { top: '50%', left: 0, transform: 'translateY(-50%)' },
      'right': { top: '50%', right: 0, transform: 'translateY(-50%)' },
    };
    return positionStyles[position] || positionStyles['bottom right'];
  };

  return (
    <div
      className="absolute -z-10 overflow-hidden blur-3xl"
      aria-hidden="true"
      style={{
        ...getPositionStyles(),
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className="relative aspect-[1155/678] w-full max-w-[36.125rem] sm:max-w-[72.1875rem] rotate-[30deg] opacity-20"
        style={{
          clipPath: selectedClipPath,
          backgroundImage: `linear-gradient(to ${position}, ${color1}, ${color2})`,
        }}
      ></div>
    </div>
  );
};

export default BackgroundGradient;
