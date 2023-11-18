import "./Switcher.scss";

interface CheckboxState {
  movers: boolean;
  passengers: boolean;
}

interface SwitcherProps {
  type: keyof CheckboxState;
  isChecked: CheckboxState;
  handleCheckboxChange: (type: keyof CheckboxState) => void;
}

const Switcher = ({ handleCheckboxChange, isChecked, type }: SwitcherProps) => {
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          id="mySwitch"
          checked={isChecked[type]}
          onChange={() => handleCheckboxChange(type)}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Switcher;
