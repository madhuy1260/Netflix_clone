import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  console.log(userStats);
  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjA3NTcwN2M3YjAwMDk5MGNiNmVmMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjMxNDc0MDMsImV4cCI6MTY2MzU3OTQwM30.N8Kd4M5X1qy21hHm8oLgOXhABBPwX0AJhPFzSe1fpTc",
          },
        });
        const statsList = response.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((each) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[each._id - 1], "New User": each.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
