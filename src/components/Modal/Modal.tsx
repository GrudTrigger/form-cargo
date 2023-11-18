import "./Modal.scss";

interface ModalProps {
  formState: {
    name: string;
    lastName: string;
    date: string;
    email: string;
    transports: Array<{
      id: number;
      name: string;
      movers: number;
      passengers: number;
      typeCar: string;
    }>;
    phone: string;
    fromАddress: string;
    toAddress: string;
    duration: number;
  };
  setModalOpen: (arg: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ formState, setModalOpen }) => {
  return (
    <div className="overlay">
      <div className="modal__container">
        <h2 className="modal__title">Заявка отправлена</h2>
        <div className="modal__adress">
          <p className="modal__paragraf">
            Откуда забрать:{" "}
            <span className="modal__paragraf__descr">
              {formState.fromАddress}
            </span>
          </p>
          <p className="modal__paragraf">
            Куда привезти:{" "}
            <span className="modal__paragraf__descr">
              {formState.toAddress}
            </span>
          </p>
          <p className="modal__paragraf">
            Дата отправки:{" "}
            <span className="modal__paragraf__descr">{formState.date}</span>
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="361"
          height="4"
          viewBox="0 0 361 4"
          fill="none"
        >
          <path d="M0 2H361" stroke="#4C73E3" stroke-width="3" />
        </svg>
        <div className="modal__cars">
          {formState.transports.map((car, i) => (
            <>
              <p className="modal__paragraf__car">
                {car.name + " " + (i + 1)}:{" "}
                <span className="modal__paragraf__descr">{car.typeCar}</span>
              </p>
              <p className="modal__paragraf">
                Кол-во грузчиков:{" "}
                <span className="modal__paragraf__descr">{car.movers}</span>
              </p>
              <p className="modal__paragraf">
                Кол-во пассажиров:{" "}
                <span className="modal__paragraf__descr">{car.passengers}</span>
              </p>
            </>
          ))}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="361"
          height="4"
          viewBox="0 0 361 4"
          fill="none"
        >
          <path d="M0 2H361" stroke="#4C73E3" stroke-width="3" />
        </svg>
        <div className="modal__person">
          <p className="modal__paragraf">
            Заказчик:{" "}
            <span className="modal__paragraf__descr">
              {formState.lastName} {formState.name}
            </span>
          </p>
          <p className="modal__paragraf">
            Телефон:{" "}
            <span className="modal__paragraf__descr">{formState.phone}</span>
          </p>
          <p className="modal__paragraf">
            E-mail:{" "}
            <span className="modal__paragraf__descr">{formState.email}</span>
          </p>
        </div>
        <p className="modal__paragraf__info">
          Информация продублирована на электронную почту
        </p>
        <button
          type="button"
          className="modal__btn"
          onClick={() => setModalOpen(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
