import { Fragment, useState } from "react";
import "./Progress.css";
import ProgressByCategory from "./ProgressByCategory";

const Progress = () => {
  const [categoryProgressIsEmpty, setCategoryProgressIsEmpty] = useState(false);

  function EmptyHandler() {
    setCategoryProgressIsEmpty(true);
  }
  return (
    <Fragment>
      <section className="progress" id="progress">
        <header>Progress</header>
        {categoryProgressIsEmpty  ? <section className="empty">You Have No Progress Yet!</section>:
        <Fragment>
          <section className="progress-main">
          <ProgressByCategory progressIsEmpty={EmptyHandler} />
          </section>
          
        </Fragment>}
      </section>
    </Fragment>
  );
};

export default Progress;
