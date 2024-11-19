import React, { useState } from 'react';
import './BombGame.css';

const BombGame = () => {
  const [guess, setGuess] = useState('');
  const [history, setHistory] = useState([]);
  const [range, setRange] = useState({ min: 1, max: 100 });
  const [bomb, setBomb] = useState(generateRandomBomb(1, 100));

  // 載入音效文件
  const successSound = new Audio('/success.mp3');
  const failSound = new Audio('/fail.mp3');

  function generateRandomBomb(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleGuess = () => {
    if (!guess) return;

    const guessedNumber = parseInt(guess);
    setHistory([...history, guessedNumber]);

    if (guessedNumber === bomb) {
      successSound.play();  // 撥放成功音效
      alert('恭喜！你猜中了炸彈！');
      resetGame();
    } else if (guessedNumber < bomb) {
      setRange((prevRange) => ({ ...prevRange, min: guessedNumber + 1 }));
      failSound.play();  // 撥放失敗音效
    } else {
      setRange((prevRange) => ({ ...prevRange, max: guessedNumber - 1 }));
      failSound.play();  // 撥放失敗音效
    }

    setGuess(''); // 清除輸入欄
  };

  const resetGame = () => {
    setBomb(generateRandomBomb(1, 100));
    setRange({ min: 1, max: 100 });
    setHistory([]);
  };

  return (
    <div>
      <div className="section title-section">
        <h1>蹦蹦炸彈！</h1>
        <h2>一起來猜數字踩炸彈</h2>
      </div>
      <div className="section range-section">
        <p>範圍: {range.min} - {range.max}</p>
      </div>
      <div className="section input-section">
        <input
          className="input"
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
          placeholder="輸入你的猜測"
        />
        <button className="button" onClick={handleGuess}>
          猜測
        </button>
      </div>
      <div className="section history-section">
        <h3>猜測紀錄:</h3>
        <ul className="guess-history">
          {history.map((h, index) => (
            <li key={index}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BombGame;
