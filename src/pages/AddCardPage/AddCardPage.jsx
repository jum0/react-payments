import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AddCardPage.module.scss";
import { getCardColor, isCardCompany } from '../../utils/cardCompany';

import { PAGE_PATH, HEADER_TEXT, BUTTON_TEXT } from "../../constants";

import CardInputContainer from "../../containers/CardInputContainer/CardInputContainer";
import CardCompanyContainer from "../../containers/CardCompanyContainer/CardCompanyContainer";

import NavigationButton from "../../components/NavigationButton/NavigationButton";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

const cx = classNames.bind(styles);

const AddCardPage = ({
  cardCompany,
  cardNumber,
  cardOwner,
  cardExpiration,
  cardCVC,
  cardPassword,
  setCardInputState,
}) => {
  // slider test
  const [pageState, setPageState] = useState({
    isBottomSliderToggled: false,
    backDropAnimation: "fade-out",
    sliderAnimation: "move-down",
  });

  const toggleCardCompanyContainer = ({ isBottomSliderToggled, backDropAnimation, sliderAnimation }) => {
    setPageState((state) => ({
      ...state,
      isBottomSliderToggled,
      backDropAnimation,
      sliderAnimation,
    }));
  };

  const showCardCompanyContainer = () => {
    toggleCardCompanyContainer({
      isBottomSliderToggled: true,
      backDropAnimation: "fade-in",
      sliderAnimation: "move-up",
    });
  };

  const hideCardCompanyContainer = () => {
    toggleCardCompanyContainer({
      isBottomSliderToggled: true,
      backDropAnimation: "fade-out",
      sliderAnimation: "move-down",
    });
    setTimeout(() => {
      toggleCardCompanyContainer({
        isBottomSliderToggled: false,
        backDropAnimation: "fade-out",
        sliderAnimation: "move-down",
      });
    }, 350);
  };

  const onCardCompanySelect = (cardCompany) => {
    console.log('cardCompany', cardCompany)
    if (typeof cardCompany !== 'string' || !isCardCompany(cardCompany)) {
      return;
    }

    setCardInputState("cardCompany", cardCompany)
  }

  return (
    <div className={cx("add-card-page")}>
      <header className={cx("add-card-page__header")}>
        <Link to={PAGE_PATH.ROOT}>
          <NavigationButton buttonText={HEADER_TEXT.ADD_CARD} />
        </Link>
      </header>
      <main className={cx("add-card-page__main")}>
        <Card cardCompany={cardCompany} backgroundColor={getCardColor(cardCompany)} className={cx("add-card-page__card")} />
        <CardInputContainer
          cardCompany={cardCompany}
          cardOwner={cardOwner}
          cardExpiration={cardExpiration}
          cardCVC={cardCVC}
          cardPassword={cardPassword}
          setCardInputState={setCardInputState}
          showCardCompanyContainer={showCardCompanyContainer}
        />
      </main>
      {pageState.isBottomSliderToggled && (
        <CardCompanyContainer
          hideCardCompanyContainer={hideCardCompanyContainer}
          backDropAnimationClass={pageState.backDropAnimation}
          bottomSliderAnimationClass={pageState.sliderAnimation}
          onCardCompanySelect={onCardCompanySelect}
          
        />
      )}
      <div className={cx("add-card-page__bottom")}>
          <Button>{BUTTON_TEXT.NEXT}</Button>
      </div>
    </div>
  );
};

export default AddCardPage;
