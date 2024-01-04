import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Activities.module.css";
import ActivityCard from "../ActivityCard/ActivityCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities, deleteActivity } from "../../Redux/actions";

function Activities() {
  // const [activities, setActivities] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActivities());
  });

  const activities = useSelector((state) => state.activities);

  // const fetchActivities = async () => {
  //   try {
  //     const endPoint = "/activity";
  //     const { data } = await axios(endPoint);
  //     setActivities(data.activities);
  //   } catch (error) {
  //     window.alert(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchActivities();
  // }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = Number(event.target.id);
    dispatch(deleteActivity(id));
  };

  return (
    <div className={styles.container}>
      {activities.length ? (
        activities.map((act) => {
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
      ) : (
        <h1>No activities yet</h1>
      )}
    </div>
  );
}

export default Activities;
