import { ButtonHTMLAttributes, CSSProperties, FC, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

interface ApplyBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    onApply: () => void;
    color: string;
    duration: number;
}

export const ApplyBtn: FC<ApplyBtnProps> = ({ className, duration, children, color, onApply, ...otherProps }) => {
  const initialBtnStyle: CSSProperties = {
    border: `1px solid ${color}`,
    padding: '20px 15px',
    borderRadius: '5px',
  }
  const [isPressing, setIsPressing] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonStyle, setButtonStyle] = useState<CSSProperties>(initialBtnStyle);
  const animationFrameId = useRef<number | null>(null);
  
  const animateButton = () => {
    if (buttonRef.current) {
      const button = buttonRef.current;
      const start = performance.now();
  
      const step = (timestamp: DOMHighResTimeStamp) => {
        let progress = (timestamp - start) / duration;
        
        if (progress < 1) {
          const newStyle: CSSProperties = {
            ...initialBtnStyle,
            background: `linear-gradient(to top, ${color} 0%, ${color} ${progress * 100}%, transparent ${progress * 100}%, transparent 100%)`,
          };
          setButtonStyle(newStyle);
          animationFrameId.current = requestAnimationFrame(step);
        } else {
          progress = 0;
          onApply();
          setButtonStyle(initialBtnStyle);
          cancelAnimationFrame(animationFrameId.current!);
          setTimeout(() => {
            setButtonStyle(initialBtnStyle);
          })
        }
      };
  
      animationFrameId.current = requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    if(isPressing) {
      animateButton();
    }
    else {
      setButtonStyle(initialBtnStyle);
      cancelAnimationFrame(animationFrameId.current!)
    }
  }, [isPressing])
  
  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsPressing(true);
  };
  
  const handleMouseUp = () => {
    setIsPressing(false);
  };
  
  return (
    <button
      ref={buttonRef}
      type="button"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      
      style={buttonStyle}
      {...otherProps}
    >
      {children}
    </button>
  );
};