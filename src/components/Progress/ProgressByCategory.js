import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, firebaseDatabase } from "../firebase";
import BarChart from "./BarChart";
import Graph from "./Graph";
import "./ProgressByCategory.css";

const ProgressByCategory = (props) => {
  const [categoryProgress, setCategoryProgress] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        const response = await fetch(
          `${firebaseDatabase}/usersprogress/${currentUser.uid}/progressByCategory.json`
        );
        const progressByCategory = await response.json();

        let dataArray = [];
        let labels = [];
        for (const category in progressByCategory) {
          let categoryData = [];
          for (const key in progressByCategory[category]) {
            categoryData.push(progressByCategory[category][key]);
          }

          function categoryRename(cat) {
            if (cat == "geography") {
              return "Geography";
            }
            if (cat == "history") {
              return "History & Heritage";
            }
            if (cat == "government") {
              return "Politics & Social System";
            }
            if (cat == "laws") {
              return "Laws & Rights";
            }
            if (cat == "symbols") {
              return "Symbols & Traditions";
            }
            if (cat == "economy") {
              return "Economy";
            }
          }
          dataArray.push({
            id: categoryRename(category),
            data: categoryData.reduce(
              (total, value) => total + Number(value),
              0
            ),
          });
        }

        const loadedData = {
          data: {
            labels: dataArray.filter((item) => item.data > 0 ).map(item => item.id),
            datasets: [
              {
                label: `Average Score`,
                data: dataArray.filter((item) => item.data > 0 && item.data).map(item => item.data),
                backgroundColor: "#d22a2a",
                borderRadius: 4,
              },
            ],
          },
        };
        setCategoryProgress(loadedData.data);
        if (loadedData.length < 1) {
          props.progressIsEmpty(true);
        }
      }
    });
  }, [auth.currentUser]);
  return (
    <section className="progress-category">
      {categoryProgress && <BarChart data={categoryProgress} />}
    </section>
  );
};

export default ProgressByCategory;
