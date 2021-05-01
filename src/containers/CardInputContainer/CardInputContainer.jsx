import classNames from "classnames/bind";
import styles from "./CardInputContainer.module.scss";

import { INPUT_LABEL_TEXT, CARD_INPUT, STATE_KEY } from "../../constants";

import CardExpirationInput from "../../components/CardExpirationInput/CardExpirationInput";
import CardNumberInput from "../../components/CardNumberInput/CardNumberInput";
import GuideInput from "../../components/Input/GuideInput/GuideInput";
import TextLimitInput from "../../components/Input/TextLimitInput/TextLimitInput";
import InputBoxList from "../../components/InputBoxList/InputBoxList";
import { isCardCompany, getCardCompany } from "../../utils/cardCompany";

const cx = classNames.bind(styles);

const CardInputContainer = ({ cardCompany, cardExpiration, cardOwner, cardCVC, cardPassword, setCardState, showCardCompanySelectContainer }) => {
  const setCardNumberState = (cardNumber) => {
    if (!Object.values(cardNumber).every(number => typeof Number(number) === 'number' && number.length === 4)) {
      return;
    }

    setCardState(STATE_KEY.CARD_NUMBER, cardNumber);
  }

  const setCardCompanyState = (cardCompany) => {
    if (!isCardCompany(cardCompany)) {
      return;
    }

    setCardState(STATE_KEY.CARD_COMPANY, cardCompany)
  }

  const setCardExpirationState = (cardExpiration) => {
    if (cardExpiration.expirationMonth.match(/0[1-9]|1[0-2]/) && cardExpiration.expirationYear.match(/2[0-9]/)) {
      return;
    }

    setCardState(STATE_KEY.CARD_EXPIRATION, cardExpiration)
  }
  
  const onCardNumberChange = (event, setCardNumberInputState) => {
    const { value, name } = event.target;
    if (Number.isNaN(Number(value))) {
      event.target.value = event.target.value.slice(0, -1);
      return;
    }

    setCardNumberInputState((state) => ({
      ...state,
      [name]: value,
    }));
  }

  const onCardNumberInputStateUpdate = (cardNumberInputState) => {
    if (Object.keys(cardNumberInputState).every((key) => cardNumberInputState[key].length === 4)) {
      const newCardCompany = getCardCompany(Object.keys(cardNumberInputState).map((key) => cardNumberInputState[key]).join(" "))      
      showCardCompanySelectContainer();
      
      if (newCardCompany) {
        setCardCompanyState(newCardCompany);
      }

      setCardNumberState({
        [STATE_KEY.FIRST_CARD_NUMBER]: cardNumberInputState.firstCardNumberInput,
        [STATE_KEY.SECOND_CARD_NUMBER]: cardNumberInputState.secondCardNumberInput,
        [STATE_KEY.THIRD_CARD_NUMBER]: cardNumberInputState.thirdCardNumberInput,
        [STATE_KEY.FOURTH_CARD_NUMBER]: cardNumberInputState.fourthCardNumberInput,
      });
    }
  }

  const onCardExpirationChange = (event, setCardExpirationInputState) => {
    const { value, name } = event.target;
    if (Number.isNaN(Number(value))) {
      event.target.value = event.target.value.slice(0, -1);
      return;
    }

    setCardExpirationInputState(state => ({
      ...state,
      [name]: value
    }))
  }

  const onCardExpirationInputStateUpdate = (cardExpirationInputState) => {
    setCardExpirationState({
      [STATE_KEY.EXPIRATION_MONTH]: cardExpirationInputState.expirationMonthInput,
      [STATE_KEY.EXPIRATION_YEAR]: cardExpirationInputState.expirationYearInput,
    });
  }
  
  return (
    <form className={cx("card-input-container")}>
      <CardNumberInput
        inputWidth="100%"
        key={INPUT_LABEL_TEXT.CARD_NUMBER}
        className={cx("card-input-container__number")}
        labelText={INPUT_LABEL_TEXT.CARD_NUMBER}
        onCardNumberChange={onCardNumberChange}
        onCardNumberInputStateUpdate={onCardNumberInputStateUpdate}
      />
      <CardExpirationInput
        inputWidth="137px"
        monthPlaceholder={CARD_INPUT.EXPIRATION_MONTH_PLACEHOLDER}
        yearPlaceholder={CARD_INPUT.EXPIRATION_YEAR_PLACEHOLDER}
        key={INPUT_LABEL_TEXT.CARD_EXPIRATION}
        className={cx("card-input-container__expiration")}
        labelText={INPUT_LABEL_TEXT.CARD_EXPIRATION}
        onCardExpirationChange={onCardExpirationChange}
        onCardExpirationInputStateUpdate={onCardExpirationInputStateUpdate}
      />
      <TextLimitInput
        inputWidth="100%"
        placeholder={CARD_INPUT.OWNER_PLACEHOLDER}
        lengthLimit={CARD_INPUT.OWNER_NAME_LENGTH_LIMIT}
        className={cx("card-input-container__owner")}
        labelText={INPUT_LABEL_TEXT.CARD_OWNER}
        setCardState={setCardState}
      />
      <GuideInput
        inputWidth="84px"
        className={cx("card-input-container__cvc")}
        labelText={INPUT_LABEL_TEXT.CARD_CVC}
        setCardState={setCardState}
      />
      <InputBoxList
        numbers={[1, 2]}
        dotCount={2}
        className={cx("card-input-container__password")}
        labelText={INPUT_LABEL_TEXT.CARD_PASSWORD}
        setCardState={setCardState}
      />
    </form>
  );
};

export default CardInputContainer;
