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
import CardContent from "@mui/material/CardContent";
import { TagCloud } from "react-tagcloud";

const transform = (arr) => {
  return arr?.map((a) => {
    return {
      value: a[0],
      count: +a[1] * 100,
    };
  });
};
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
        <>
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
                sx={{ fontSize: 16, fontWeight: "bold" }}
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
          </div>
          <Typography
            sx={{
              fontSize: 16,
              marginLeft: 5,
              marginTop: 5,
              fontWeight: "bold",
            }}
            color="text.secondary"
            gutterBottom
          >
            Word Cloud Representation of Topic-Related Words, with More
            Important Words in Bold{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              marginLeft: 5,
              marginTop: 1,
            }}
            color="text.secondary"
            gutterBottom
          >
            the importance of a word in a topic is determined by the probability of the word occurring within that topic, given the entire corpus.
          </Typography>
          <div className="topic-cloud-represntation">
            <div className="new-topic-container">
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
                className="text-word"
              >
                Old Feature Topcis
              </Typography>
              <div className="new-topics-cloud">
                {topic?.oldTopics?.map((t, ind) => {
                  const words = transform(t);
                  return (
                    <div className="card-topic-cloud">
                      <Typography
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                        color="text.secondary"
                        gutterBottom
                        className="text-word"
                      >
                        {`Topic ${ind}`}
                      </Typography>
                      <TagCloud tags={words} minSize={10} maxSize={40} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="line"></div>
            <div className="old-feature-container">
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
                className="text-word"
              >
                New Feature Topcis
              </Typography>
              <div className="old-topics-cloud">
                {topic?.newTopics?.map((t, ind) => {
                  const words = transform(t);
                  return (
                    <div className="card-topic-cloud">
                      <Typography
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                        color="text.secondary"
                        gutterBottom
                        className="text-word"
                      >
                        {`Topic ${ind}`}
                      </Typography>
                      <CardContent>
                        <TagCloud tags={words} minSize={10} maxSize={30} />
                      </CardContent>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TopicModelling;
