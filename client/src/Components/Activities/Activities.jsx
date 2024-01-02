import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Activities.module.css";
import ActivityCard from "../ActivityCard/ActivityCard";

function Activities() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const endPoint = "http://localhost:3001/activity";
      const { data } = await axios(endPoint);
      setActivities(data.activities);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = Number(event.target.id);

    try {
      const endPoint = "http://localhost:3001/activity";
      const { data } = await axios.delete(endPoint, { data: { id } });
      setActivities(data.activities);
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      {activities.length
        ? activities.map((act) => {
            return (
              <ActivityCard
                key={`act${act.id}`}
                id={act.id}
                name={act.name}
                difficulty={act.difficulty}
                season={act.season}
                duration={act.duration}
                Countries={act.Countries}
                handleDelete={handleDelete}
              />
            );
          })
        : "No activities yet"}
    </div>
  );
}

export default Activities;
