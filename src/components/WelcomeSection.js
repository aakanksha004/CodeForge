import React, { useState, useEffect } from 'react';

const WelcomeSection = () => {
  const welcomeText = "WELCOME   TO   CODEFORGE.";
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= welcomeText.length) {
        setDisplayText(welcomeText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center gap-8 mb-5">
      <div className="text-4xl font-extrabold text-black">
        {displayText.split('').map((letter, index) => (
          <span
            key={index}
            className="inline-block text-[#00ffbc] tracking-wider font-sans"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.4s ease',
              animationDelay: `${index * 0.1}s`,
              marginLeft: letter === ' ' ? '0.5rem' : '0.1rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              fontFamily: "Doto", 
              letterSpacing: '0.05em',
              fontWeight: 800
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WelcomeSection;