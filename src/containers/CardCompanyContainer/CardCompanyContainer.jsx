import classNames from "classnames/bind";
import styles from "./CardCompanyContainer.module.scss";

import { getAllCardCompanies, getCardColor } from '../../utils/cardCompany';

import BackDrop from "../../components/BackDrop/BackDrop";
import BottomSlider from "../../components/BottomSlider/BottomSlider";
import CircleButton from "../../components/CircleButton/CircleButton";

const cx = classNames.bind(styles);

const cardCompanyContainer = ({
  hideCardCompanyContainer,
  backDropAnimationClass,
  bottomSliderAnimationClass,
  onCardCompanySelect
}) => {
  const cardCompanies = getAllCardCompanies();
  const cardCompanyItems = cardCompanies.map((cardCompany) => (
    <CircleButton
      key={cardCompany}
      className={cx("card-company-container__card-company")}
      buttonText={cardCompany}
      circleColor={getCardColor(cardCompany)}
      onClick={() => onCardCompanySelect(cardCompany)}
    />
  ));

  return (
    <div className={cx("card-company-container")}>
      <BackDrop className={backDropAnimationClass} backDropClick={hideCardCompanyContainer} />
      <BottomSlider className={`${cx("card-company-container__bottom-slider")} ${bottomSliderAnimationClass}`}>
        {cardCompanyItems}
      </BottomSlider>
    </div>
  );
};

export default cardCompanyContainer;
