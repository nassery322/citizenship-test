import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, firebaseDatabase } from "../firebase";
import BarChart from "./BarChart";
import Graph from "./Graph";
import "./ProgressByCategory.css";

const ProgressByCategory = () => {
  const [categoryProgress, setCategoryProgress] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        const response = await fetch(
          `${firebaseDatabase}/usersprogress/${'O2iGFbrlXNQ3mwFWxxrRVUG7Et72'}/progressByCategory.json`
        );
        const progressByCategory = await response.json();

        let dataArray = [];
        let labels = [];
        for (const category in progressByCategory) {
          let categoryData = [];
          for (const key in progressByCategory[category]) {
            categoryData.push(progressByCategory[category][key]);
            labels.push(Number(key) + 1 + "th test");
            console.log(labels);
          }
          dataArray.push({ id: category, data: categoryData });
        }
        const loadedData = dataArray.map((item) => {
          return {
            data: {
              labels: Array.from({ length: item.data.length }, (_, i) => i),
              average:
                item.data.reduce((total, value) => total + parseInt(value), 0) /
                item.data.length,
              datasets: [
                {
                  label: `${item.id} Progress`,
                  data: item.data,
                  backgroundColor: "#d22a2a",
                  borderColor: "black",
                  borderWidth: 1,
                },
              ],
              
              id: item.id,
            },
          };
        });

        setCategoryProgress(loadedData);
      }
    });
  }, [auth.currentUser]);
  console.log(categoryProgress);
  return (
    <section className="progress-category">
      {categoryProgress &&
        categoryProgress.map((item) => (
          <BarChart key={item.id} data={item.data} />
        ))}
    </section>
  );
};

export default ProgressByCategory;
