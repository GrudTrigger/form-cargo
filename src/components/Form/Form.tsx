import Counter from "../ui/Counter/Counter";
import "./Form.scss";
import Input from "../ui/Input/Input";
import React, { useState } from "react";
import Transport from "../Transport/Transport";
import Modal from "../Modal/Modal";


interface Car {
  id: number;
  name: string;
  movers: number;
  passengers: number;
  typeCar: string;
}
interface FormData {
  name: string;
  lastName: string;
  date: string;
  email: string;
  transports: Car[];
  phone: string;
  fromАddress: string;
  toAddress: string;
  duration: number;
}

const Form: React.FC = () => {
  const [formState, setFormState] = useState<FormData>({
    name: "",
    lastName: "",
    date: "",
    email: "",
    transports: [
      {
        id: 0,
        name: "Транспорт",
        movers: 0,
        passengers: 0,
        typeCar: "Любая газель",
      },
    ],
    phone: "",
    fromАddress: "",
    toAddress: "",
    duration: 1,
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const counerMoversAndPassenger = (
      type: string,
      action: string,
      index?: number
  ) => {
    setFormState((prevState) => {
      if (type === "duration") {
        return {
          ...prevState,
          duration:
              action === "increment"
                  ? prevState.duration + 1
                  : prevState.duration > 0
                      ? prevState.duration - 1
                      : 0,
        };
      }

      const { transports } = prevState;
      const transport = transports[index ?? 0];

      if (type === "movers" || type === "passengers") {
        const valueKey = type === "movers" ? "movers" : "passengers";
        const updatedTransport = {
          ...transport,
          [valueKey]:
              action === "increment"
                  ? transport[valueKey] + 1
                  : transport[valueKey] > 0
                      ? transport[valueKey] - 1
                      : 0,
        };

        const updatedTransports = [...transports];
        updatedTransports[index ?? 0] = updatedTransport;

        return { ...prevState, transports: updatedTransports };
      }

      return prevState;
    });
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
      selectedOption: { value: string; label: string } | undefined,
      index: number
  ) => {
    if (selectedOption) {
      const { value } = selectedOption;

      setFormState((prevState) => {
        const updatedTransports = [...prevState.transports];
        updatedTransports[index].typeCar = value;

        return {
          ...prevState,
          transports: updatedTransports,
        };
      });
    }
  };

  const addTransport = () => {
    setFormState((prevState) => {
      return {
        ...prevState,
        transports: [
          ...prevState.transports,
          {
            id: prevState.transports.length,
            name: "Транспорт",
            movers: 0,
            passengers: 0,
            typeCar: "Любая газель",
          },
        ],
      };
    });
  };
  console.log(formState);
  const removeTransport = (index: number) => {
    setFormState((prevState) => {
      const updatedTransports = prevState.transports.filter(
        (_, i) => i !== index
      );
      return { ...prevState, transports: updatedTransports };
    });
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormState({
      name: "",
      lastName: "",
      date: "",
      email: "",
      transports: [
        {
          id: 0,
          name: "Транспорт",
          movers: 0,
          passengers: 0,
          typeCar: "Любая газель",
        },
      ],
      phone: "",
      fromАddress: "",
      toAddress: "",
      duration: 1,
    });
  };

  return (
    <section className="form__container">
      <h1 className="form__title">Заявка на отправку груза</h1>
      <form onSubmit={submitForm}>
        <div className="form__where">
          <div className="form__where-from">
            <h3 className="form__subtitle">Откуда</h3>
            <Input
              name="fromАddress"
              value={formState.fromАddress}
              label="Адрес"
              type="text"
              placeholder="Введите адрес"
              handleInputChange={handleInputChange}
            />
            <Input
              name="date"
              value={formState.date}
              label="Дата отправки"
              type="date"
              placeholder="28.09.2023"
              handleInputChange={handleInputChange}
            />

            <div className="form__container__timer">
              <label htmlFor="" className="form__label__duration">
                Длительность
              </label>
              <Counter
                num={formState.duration}
                counterIncrease={counerMoversAndPassenger}
                type="duration"
              />
            </div>
          </div>
          <div className="form__where-to">
            <h3 className="form__subtitle">Куда</h3>
            <Input
              name="toAddress"
              value={formState.toAddress}
              label="Адрес"
              type="text"
              placeholder="Введите адрес"
              handleInputChange={handleInputChange}
            />
          </div>
        </div>

        {formState.transports.map((car, index) => (
          <Transport
            key={index}
            name={car.name}
            movers={car.movers}
            passengers={car.passengers}
            typeCar={car.typeCar}
            index={index}
            counerMoversAndPassenger={counerMoversAndPassenger}
            removeTransport={removeTransport}
            handleSelectChange={handleSelectChange}
          />
        ))}
        <button type="button" className='form__btn-add' onClick={addTransport}>
          + Добавить еще транспорт
        </button>

        <div className="form__contacts">
          <h3 className="form__subtitle">Контакты</h3>
          <div className="form__contacts__container">
            <Input
              name="lastName"
              value={formState.lastName}
              label="Фамилия"
              type="text"
              placeholder="Укажите фамилию"
              handleInputChange={handleInputChange}
            />
            <Input
              name="phone"
              value={formState.phone}
              label="Телефон"
              type="phone"
              placeholder="Телефон"
              handleInputChange={handleInputChange}
            />
            <Input
              name="name"
              value={formState.name}
              label="Имя"
              type="text"
              placeholder="Укажите имя"
              handleInputChange={handleInputChange}
            />
            <Input
              name="email"
              value={formState.email}
              label="E-mail"
              type="email"
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="form__checkbox__container">
            <input type="checkbox" className="form__checkbox" required />
            <label className="form__checkbox__label">
              Соглашаюсь на обработку своих персональных данных
            </label>
          </div>
        </div>

        <div className="form__btn__container">
          <button className="form__btn__submit">Отправить</button>
          <button type="reset" className="form__btn__reset" onClick={resetForm}>
            Сбросить
          </button>
        </div>
      </form>
      {modalOpen && <Modal formState={formState} setModalOpen={setModalOpen} />}
    </section>
  );
};

export default Form;
