import { useState } from "react";
import Counter from "../ui/Counter/Counter";
import Switcher from "../ui/Switcher/Switcher";
import "./Transport.scss";
import Select from "react-select";


interface TransportProps {
  name: string;
  movers: number;
  passengers: number;
  typeCar: string;
  index: number;
  counerMoversAndPassenger: (
      type: string,
      action: string,
      index?: number
  ) => void;
  removeTransport: (index: number) => void;
  handleSelectChange: (selectedOption: { value: string, label: string } | undefined, index: number) => void;
}
interface CheckboxState {
  movers: boolean;
  passengers: boolean;
}

const Transport = ({
  name,
  movers,
  passengers,
  typeCar,
  index,
  counerMoversAndPassenger,
  removeTransport,
  handleSelectChange,
}: TransportProps) => {
  const [isChecked, setIsChecked] = useState<CheckboxState>({
    movers: false,
    passengers: false,
  });

  const handleCheckboxChange = (type: keyof CheckboxState) => {
    setIsChecked((prev) => {
      return {
        ...prev,
        [type]: !prev[type],
      };
    });
  };
  const options = [
    { value: 'Любая газель', label: 'Любая газель' },
    { value: 'Любая фура', label: 'Любая фура' },
    { value: 'Любой фургон', label: 'Любая фургон' },
  ];
  const getValue = (): { value: string; label: string } | undefined => {
    return typeCar ? options.find((c) => c.value === typeCar) : undefined;
  };

  const customStyles = {
    control: (provided:any
    ) => ({
      ...provided,
      width: '334px',
      height: '54px',
      borderRadius: '16px',
      border: '1px solid #DEE4F0',
      transition: 'box-shadow 0.3s',
      ':hover': {
        boxShadow: '0px 0px 3px 1px rgba(53, 165, 0, 0.70)',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#4C73E3',
    }),
  };

  return (
    <div className="transport">
      <div className="form__transport">
        <div>
          <h3 className="form__subtitle">{name + " " + (index + 1)}</h3>
          <div className="form__switchs">
            <div className="form__switchs__container">
              <label htmlFor="">Грузчики</label>
              <Switcher
                handleCheckboxChange={handleCheckboxChange}
                isChecked={isChecked}
                type={"movers"}
              />
            </div>
            <div className="form__switchs__container">
              <label htmlFor="">Кол-во грузчиков</label>
              <Counter
                counterIncrease={counerMoversAndPassenger}
                num={movers}
                type="movers"
                indexCar={index}
                isChecked={isChecked}
              />
            </div>
            <div className="form__switchs__container">
              <label htmlFor="">Пассажиры</label>
              <Switcher
                handleCheckboxChange={handleCheckboxChange}
                isChecked={isChecked}
                type={"passengers"}
              />
            </div>
            <div className="form__switchs__container">
              <label htmlFor="">Кол-во пассажиров</label>
              <Counter
                counterIncrease={counerMoversAndPassenger}
                num={passengers}
                type="passengers"
                indexCar={index}
                isChecked={isChecked}
              />
            </div>
          </div>
        </div>
        <div className="form__select__container">
          <Select
              options={options}
              value={getValue()}
              onChange={(selectedOption) => handleSelectChange(selectedOption as { value: string, label: string } | undefined, index)}
              styles={customStyles}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="52"
            viewBox="0 0 21 52"
            fill="none"
          >
            <path
              d="M10.6939 35.3483C13.2352 35.3483 15.5165 34.3375 17.1626 32.6626C18.8375 31.0166 19.8482 28.7352 19.8482 26.1939C19.8482 23.6527 18.8375 21.3713 17.1626 19.6964C15.5165 18.0503 13.2352 17.0107 10.6939 17.0107C8.15265 17.0107 5.87129 18.0503 4.19637 19.6964C2.55033 21.3713 1.51073 23.6527 1.51073 26.1939C1.51073 28.7352 2.55033 31.0166 4.19637 32.6626C5.87129 34.3375 8.15265 35.3483 10.6939 35.3483ZM8.0949 24.1329C8.0949 24.4216 7.86387 24.6527 7.60397 24.6527C7.31519 24.6527 7.08417 24.4216 7.08417 24.1329C7.08417 23.382 7.08417 22.6023 7.6906 21.7938C8.00826 21.3606 8.49919 20.9563 9.10562 20.6386C9.59655 20.4076 10.203 20.2343 10.8094 20.2343C11.5025 20.2343 12.2244 20.4365 12.8598 20.7541C13.4951 21.1007 14.0149 21.5627 14.3325 22.1114C14.6213 22.6601 14.6791 23.2665 14.5924 23.8152C14.5058 24.4505 14.217 25.057 13.8416 25.4901C13.3507 26.0099 12.802 26.2698 12.3111 26.5009C12.1089 26.5875 11.9068 26.6741 11.7913 26.7608C11.5891 26.8763 11.4736 27.0495 11.387 27.1939C11.2715 27.3961 11.2137 27.6271 11.1271 27.8581C11.0404 28.118 10.7517 28.2624 10.4918 28.1758C10.2319 28.0892 10.0875 27.8004 10.1741 27.5405C10.2607 27.2517 10.3474 26.9918 10.4918 26.703C10.665 26.4142 10.8961 26.1255 11.2137 25.9233C11.4159 25.7789 11.6469 25.6634 11.9068 25.5768C12.3111 25.3746 12.7442 25.1725 13.0619 24.8259C13.3218 24.5372 13.5239 24.104 13.5817 23.6708C13.6395 23.2954 13.6106 22.92 13.4373 22.6023C13.2352 22.2269 12.8309 21.9093 12.3977 21.6494C11.9068 21.3895 11.3292 21.2451 10.8094 21.2451C10.3474 21.2451 9.9142 21.3606 9.53879 21.5627C9.10562 21.7938 8.73021 22.0825 8.49919 22.4002C8.0949 22.9489 8.0949 23.5264 8.0949 24.1329ZM17.8845 33.3846C16.0652 35.2328 13.4951 36.3879 10.6939 36.3879C7.86387 36.3879 5.32261 35.2328 3.47443 33.3846C1.65512 31.5653 0.5 28.9951 0.5 26.1939C0.5 23.3639 1.65512 20.8226 3.47443 18.9744C5.32261 17.1551 7.86387 16 10.6939 16C13.4951 16 16.0652 17.1551 17.8845 18.9744C19.7327 20.8226 20.8878 23.3639 20.8878 26.1939C20.8878 28.9951 19.7327 31.5653 17.8845 33.3846Z"
              fill="#4C73E3"
            />
            <circle cx="10.5" cy="31" r="1" fill="#4C73E3" />
          </svg>
        </div>
      </div>
      {index !== 0 && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            onClick={() => removeTransport(index)}
            style={{ cursor: "pointer" }}
          >
            <path
              d="M9.43687 8.49627L16.4719 1.4544C16.596 1.32968 16.6656 1.16085 16.6655 0.984895C16.6654 0.808943 16.5955 0.640208 16.4712 0.515649C16.2225 0.268149 15.7844 0.2669 15.5331 0.5169L8.49999 7.55877L1.46437 0.515024C1.21437 0.268149 0.77624 0.269399 0.52749 0.516274C0.465748 0.57777 0.416872 0.650948 0.383714 0.731536C0.350556 0.812124 0.33378 0.898509 0.334365 0.98565C0.334365 1.16315 0.403115 1.3294 0.52749 1.45252L7.56249 8.49565L0.528115 15.5394C0.403981 15.6643 0.334465 15.8334 0.334816 16.0095C0.335168 16.1856 0.405359 16.3544 0.529991 16.4788C0.650616 16.5981 0.82124 16.6669 0.99749 16.6669H1.00124C1.17812 16.6663 1.34874 16.5969 1.46687 16.4763L8.49999 9.4344L15.5356 16.4781C15.66 16.6019 15.8262 16.6707 16.0025 16.6707C16.0896 16.6709 16.176 16.6539 16.2565 16.6207C16.3371 16.5874 16.4103 16.5386 16.4719 16.477C16.5336 16.4153 16.5824 16.3421 16.6156 16.2616C16.6489 16.181 16.6659 16.0947 16.6656 16.0075C16.6656 15.8307 16.5969 15.6638 16.4719 15.5406L9.43687 8.49627Z"
              fill="#FF0404"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Transport;
