import "./Input.scss";

interface InputProps {
  name: string;
  value: string;
  label: string;
  type: string;
  placeholder?: string;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  value,
  label,
  type,
  placeholder,
  handleInputChange,
}: InputProps) => {
  return (
    <div className="input__container">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        type={type}
        placeholder={placeholder}
        className="input"
        tabIndex={0}
        required
      />
    </div>
  );
};

export default Input;
