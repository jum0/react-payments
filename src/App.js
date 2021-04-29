import "./app.scss";
import { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";

import CardListPage from "./pages/CardListPage/CardListPage";
import AddCardPage from "./pages/AddCardPage/AddCardPage";
import AddCardCompletePage from "./pages/AddCardCompletePage/AddCardCompletePage";

// TODO : Card Input diable 시키기
function App() {
  const [pageInputState, setInputState] = useState({
    cardCompany: "",
    cardNumber: {
      firstCardNumber: "",
      secondCardNumber: "",
      thirdCardNumber: "",
      fourthCardNumber: "",
    },
    cardOwner: "",
    cardExpiration: "",
    cardNickName: "",
    cardCVC: "",
    cardPassword: [],
  });

  const setCardInputState = (stateKey, stateValue) => {
    if (!(stateKey in pageInputState)) {
      return;
    }

    setInputState((state) => ({
      ...state,
      [stateKey]: stateValue,
    }));
  };

  return (
    <div className="App">
      {/* ContextAPI 적용하기 */}
      <Switch>
        <Route
          path="/add"
          exact
          component={() => (
            <AddCardPage
              cardCompany={pageInputState.cardCompany}
              cardNumber={pageInputState.cardNumber}
              cardOwner={pageInputState.cardOwner}
              cardExpiration={pageInputState.cardExpiration}
              cardCVC={pageInputState.cardCVC}
              cardPassword={pageInputState.cardPassword}
              setCardInputState={setCardInputState}
            />
          )}
        />
        <Route
          path="/complete"
          exact
          component={() => (
            <AddCardCompletePage
              cardCompany={pageInputState.cardCompany}
              cardNickName={pageInputState.cardNickName}
            />
          )}
        />
        <Route component={CardListPage} />
      </Switch>
    </div>
  );
}

export default App;
