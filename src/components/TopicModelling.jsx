import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import "./topic-panel.css";
import { useDispatch, useSelector } from "react-redux";
import { APP_URL } from "../constants";
import {
  fetchFailed,
  fetchStarted,
  fetchSuccess,
} from "../redux/topicModelling";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const TopicModelling = () => {
  const [dataset, setDataset] = useState("zoom");
  const dispatch = useDispatch();
  const topic = useSelector((state) => state.topic);
  const handleChange = (e) => {
    setDataset(e.target.value);
  };
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const url =
          dataset === "zoom"
            ? `${APP_URL}/zoom-topic-modelling`
            : `${APP_URL}/webex-topic-modelling`;
        const resp = await fetch(url);
        const jsonData = await resp.json(resp);
        dispatch(
          fetchSuccess({
            newTopics: jsonData.new_topics,
            oldTopics: jsonData.old_topics,
          })
        );
      } catch (error) {
        dispatch(fetchFailed());
      }
    };
    dispatch(fetchStarted());
    fetchTopics();
  }, [dispatch, dataset]);
  console.log(topic);
  return (
    <div className="topic-panel">
      <FormControl className="dataset-select">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dataset}
          label="Age"
          onChange={handleChange}
          className="da-select"
        >
          <MenuItem value={"zoom"}>Zoom</MenuItem>
          <MenuItem value={"webex"}>Webex</MenuItem>
        </Select>
        <FormHelperText>Choose a dataset</FormHelperText>
      </FormControl>
      {topic?.loading ? (
        <div className="spinner-div">
          <CircularProgress />
        </div>
      ) : (
        <div className="topics">
          <div className="old-topics">
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold" }}
              color="text.secondary"
              gutterBottom
            >
              old features are grouped into these topics
            </Typography>
            {topic?.oldTopics?.map((topic, index) => {
              return (
                <div key={index} className="topic-item">
                  <div>{`Topic ${index}:`}</div>
                  <div>
                    {topic?.map((t, ind) => (
                      <span>
                        {t?.[0] + (ind === topic.length - 1 ? " " : ", ")}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="new-topics">
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold"  }}
              color="text.secondary"
              gutterBottom
            >
              New Features are grouped into these topics
            </Typography>
            {topic?.newTopics?.map((topic, index) => {
              return (
                <div key={index} className="topic-item">
                  <div>{`Topic ${index}:`}</div>
                  <div>
                  {topic?.map((t, ind) => (
                      <span>
                        {t?.[0] + (ind === topic.length - 1 ? " " : ", ")}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="topic-cloud-represntation">
            
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicModelling;
