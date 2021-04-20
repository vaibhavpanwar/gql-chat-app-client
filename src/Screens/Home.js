import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { headingConstants } from "../redux/constants";
import "./Home.css";
import { getGroups } from "../gql/queries";
import { useQuery } from "@apollo/client";

const Home = ({ history }) => {
  //redux
  const dispatch = useDispatch();

  //component level state to hold groups data
  const [groups, setGroups] = useState([]);

  //query to display groups
  const { loading, data, error } = useQuery(getGroups);

  useEffect(() => {
    dispatch({
      type: headingConstants.CHANGE_HEADING,
      payload: "Public Chat Rooms",
    });
  }, [dispatch]);

  useEffect(() => {
    if (data?.getGroups) {
      console.log(data?.getGroups);
      setGroups(data?.getGroups);
    }
  }, [groups?.length, data]);

  return (
    <>
      <div className="home-wrapper">
        {loading && <h3>Loading...</h3>}
        {error && <h3>{"Soething went wrong"}</h3>}
        {groups.length > 0 &&
          groups.map((item) => (
            <div
              onClick={() => history.push(`/${item._id}`)}
              key={item._id}
              style={{
                backgroundImage: `url(${item.image})`,
              }}
              className="home-chat-groups"
            >
              <p className="home-chat-groups-heading">{item.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
