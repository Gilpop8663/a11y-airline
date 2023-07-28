import React, { useState, MouseEvent, useRef } from 'react';
import './SpinButton.css';

const CUSTOMER_KIND = {
  adult: '성인',
  infant: '소아',
  baby: '유아',
};

interface SpinButtonProps {
  kind: 'adult' | 'infant' | 'baby';
}

const SpinButton = ({ kind }: SpinButtonProps) => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const increment = () => {
    if (!inputRef.current) return;

    if (count === 3) {
      announceMessage('최대 인원수는 3명까지 가능합니다');
      return;
    }

    announceMessage(`${CUSTOMER_KIND[kind]} 승객 추가 ${count + 1}`);
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count === 0) {
      announceMessage('최소 인원수는 0명까지 가능합니다');
      return;
    }

    announceMessage(`${CUSTOMER_KIND[kind]} 승객 감소 ${count - 1}`);
    setCount((prevCount) => prevCount - 1);
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const announceMessage = (message: string) => {
    const screenReaderElement = document.createElement('div');
    screenReaderElement.setAttribute('aria-live', 'assertive');
    screenReaderElement.setAttribute('aria-atomic', 'true');
    screenReaderElement.classList.add('screen-reader');
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
        <div className="spinButtonLabel">
          <label>{CUSTOMER_KIND[kind]}</label>
          <div
            tabIndex={0}
            role="button"
            aria-label="최대 인원수는 3명까지 가능합니다"
            className="helpIcon"
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            ?
            {isTooltipVisible && (
              <span className="tooltip">최대 인원수는 3명까지 가능합니다</span>
            )}
          </div>
        </div>
        <button
          aria-label={`${CUSTOMER_KIND[kind]} 탑승자 한 명 줄이기`}
          type="button"
          onClick={decrement}
          className="spinButton"
          aria-disabled={count === 0}
        >
          -
        </button>
        <input
          ref={inputRef}
          aria-label={`${CUSTOMER_KIND[kind]} 탑승자 ${count}`}
          type="text"
          readOnly
          maxLength={3}
          className="spinButtonInput"
          value={count}
        />
        <button
          aria-label={`${CUSTOMER_KIND[kind]} 탑승자 한 명 늘리기`}
          type="button"
          onClick={increment}
          className="spinButton"
          aria-disabled={count === 3}
        >
          +
        </button>
      </div>
    </section>
  );
};

export default SpinButton;
