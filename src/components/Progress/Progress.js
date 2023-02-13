import { Fragment, useState } from "react";
import OverallProgress from "./OverallProgress";
import "./Progress.css";
import ProgressByCategory from "./ProgressByCategory";

const Progress = () => {
  const [empty, setEmpty] = useState(false);
  const [categoryProgressIsEmpty, setCategoryProgressIsEmpty] = useState(false);
  function EmptyHandler() {
    setEmpty(true);
  }
  function categoryEmptyHandler() {
    setCategoryProgressIsEmpty(true);
  }
  return (
    <Fragment>
      <section className="progress" id="progress">
        <header>Progress</header>
        {empty && categoryProgressIsEmpty ?<section className="empty">You Have No Progress Yet!</section>:
        <Fragment>
          <ProgressByCategory progressIsEmpty={categoryEmptyHandler} />
        </Fragment>}
      </section>
    </Fragment>
  );
};

export default Progress;
