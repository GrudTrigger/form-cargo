import "./Counter.scss";

interface CounterProps {
  num: number;
  type: "movers" | "passengers" | "duration";
  indexCar?: number;
  counterIncrease: (type: string, action: string, index?: number) => void; // Сделали index необязательным
  isChecked?: { [key in "movers" | "passengers"]: boolean };
}

const Counter = ({
  num,
  counterIncrease,
  type,
  indexCar,
  isChecked = { movers: false, passengers: false },
}: CounterProps) => {
  const isActive =
    type === "duration"
      ? true
      : isChecked[type as keyof CounterProps["isChecked"]];
  return (
    <div className="counter__container">
      <button
        type="button"
        className="counter__btn"
        disabled={!isActive}
        onClick={() => counterIncrease(type, "decrease", indexCar)}
      >
        {" "}
        -{" "}
      </button>
        {type === 'duration' ? (<span className="counter__duration">{num} ч.</span>) : (<span className="counter__duration">{num}</span>)}
      <button
        type="button"
        className="counter__btn"
        disabled={!isActive}
        onClick={() => counterIncrease(type, "increment", indexCar)}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default Counter;
