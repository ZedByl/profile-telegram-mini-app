import React, { useEffect, useState } from 'react';
import he from 'he';

interface IProps {
  text: string;
  speed?: number;
  delay?: number;
  onFinished?: (value: boolean) => void;
}

export const Typewriter: React.FC<IProps> = ({ text, speed = 100, delay = 0, onFinished }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const decodedText = he.decode(text);

    const timer = setTimeout(() => {
      let index = 0;
      const typeTimer = setInterval(() => {
        if (index < decodedText.length) {
          setDisplayedText(prev => prev + decodedText.charAt(index));
          index++;
        } else {
          clearInterval(typeTimer);
          if (onFinished) {
            onFinished(true);
          }
        }
      }, speed);

      return () => clearInterval(typeTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, onFinished]);

  return (
    <div className="typewriter">
      {displayedText}
    </div>
  );
};
