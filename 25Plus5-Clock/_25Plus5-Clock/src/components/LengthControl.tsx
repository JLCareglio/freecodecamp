import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface LengthControlProps {
  id: string;
  title: string;
  length: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const LengthControl: React.FC<LengthControlProps> = ({
  id,
  title,
  length,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="length-control">
      <div id={`${id}-label`} className="control-label">
        {title}
      </div>
      <div className="control-buttons">
        <button
          id={`${id}-decrement`}
          className="control-btn decrement"
          onClick={onDecrement}
          aria-label={`Decrease ${title}`}
        >
          <Minus size={20} />
        </button>
        <input
          id={`${id}-length`}
          type="number"
          value={length}
          readOnly
          className="length-display"
          style={{
            MozAppearance: 'textfield',
            WebkitAppearance: 'none',
            width: '94px',
          }}
        />
        <button
          id={`${id}-increment`}
          className="control-btn increment"
          onClick={onIncrement}
          aria-label={`Increase ${title}`}
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default LengthControl;
