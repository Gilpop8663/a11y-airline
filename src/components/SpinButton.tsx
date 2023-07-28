import React, { useState, MouseEvent, useRef } from 'react';
import './SpinButton.css';

const SpinButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const increment = () => {
    if (!inputRef.current) return;

    if (count === 3) {
      announceMessage('최대 인원수는 3명까지 가능합니다');
      return;
    }

    announceMessage(`성인 승객 추가 ${count + 1}`);
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count === 0) {
      announceMessage('최소 인원수는 0명까지 가능합니다');
      return;
    }

    announceMessage(`성인 승객 감소 ${count - 1}`);
    setCount((prevCount) => prevCount - 1);
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const announceMessage = (message: string) => {
    const screenReaderElement = document.createElement('div');
    screenReaderElement.setAttribute('aria-live', 'assertive');
    screenReaderElement.setAttribute('aria-atomic', 'true');
    screenReaderElement.innerText = message;
    document.body.appendChild(screenReaderElement);
    // 스크린 리더가 메시지를 읽은 후 해당 엘리먼트를 제거하여 화면에 보이지 않도록 함
    setTimeout(function () {
      document.body.removeChild(screenReaderElement);
    }, 1000);
  };

  return (
    <section className="spinButtonContainer">
      <div>
        <h1>승객 선택</h1>
        <div className="spinButtonLabel">
          <label>성인</label>
          <div
            aria-label="승객 옵션 정보"
            className="helpIcon"
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            ?
            {isTooltipVisible && (
              <span tabIndex={0} className="tooltip">
                최대 인원수는 3명까지 가능합니다
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          aria-label="성인 탑승자 한명 줄이기"
          onClick={decrement}
          className="spinButton"
          aria-labelledby="input-1"
        >
          -
        </button>
        <input
          id="input-1"
          ref={inputRef}
          aria-label={`성인 ${count}`}
          type="text"
          readOnly
          aria-disabled={count === 0 || count === 3}
          maxLength={3}
          className="spinButtonInput"
          value={count}
        />
        <button
          aria-label="성인 탑승자 한명 늘리기"
          type="button"
          onClick={increment}
          className="spinButton"
        >
          +
        </button>
      </div>
    </section>
  );
};

export default SpinButton;
