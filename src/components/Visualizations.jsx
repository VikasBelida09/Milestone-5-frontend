import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFailed,
  fetchStarted,
  fetchSuccess,
} from "../redux/visualizationsSlice";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

import "./visualizations.css";
import { APP_URL } from "../constants";
import BarChart from "./BarChart";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TagCloud } from "react-tagcloud";
import Typography from "@mui/material/Typography";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Visualizations = () => {
  const [dataset, setDataset] = useState("zoom");
  const dispatch = useDispatch();
  const vis = useSelector((state) => state.vis);
  useEffect(() => {
    const url =
      dataset === "zoom" ? `${APP_URL}/zoom_vis` : `${APP_URL}/webex_vis`;
    const fetchData = async () => {
      try {
        const data = await fetch(url);
        const jsonData = await data.json();
        dispatch(
          fetchSuccess({
            rpm: jsonData.releases_per_month,
            top15: jsonData.top15,
            wordCloud: jsonData.word_cloud,
            top15WordsWithStopwords:jsonData.top15stopwords,
            bigrams:jsonData.bigrams,
            bigramsWithStopwords:jsonData.bigramsWithStopWords
          })
        );
      } catch (error) {
        dispatch(fetchFailed());
      }
    };
    dispatch(fetchStarted());
    fetchData();
  }, [dataset, dispatch]);
  const handleChange = (e) => {
    setDataset(e.target.value);
  };
  const data = {
    labels: months,
    datasets: [
      {
        label: "Number of Features",
        borderWidth: 1,
        data: months.map((month) => vis?.rpm?.[month]),
        backgroundColor: "rgba(0, 0,255, 0.2)",
        borderColor: "rgba(0, 0, 255,0.7)",
      },
    ],
  };
  const top15 = {
    labels: Object?.keys(vis?.top15 || {}),
    datasets: [
      {
        label: "Occurances of the token",
        borderWidth: 1,
        data: Object?.values(vis?.top15 || {}),
        backgroundColor: "rgba(255, 0 ,0, 0.2)",
        borderColor: "rgba(255, 0, 0,0.7)",
      },
    ],
  };
  const top15WithoutStopWords = {
    labels: Object?.keys(vis?.top15WordsWithStopwords || {}),
    datasets: [
      {
        label: "Occurances of the token",
        borderWidth: 1,
        data: Object?.values(vis?.top15WordsWithStopwords || {}),
        backgroundColor: "rgba(255, 0 ,0, 0.2)",
        borderColor: "rgba(255, 0, 0,0.7)",
      },
    ],
  };
  const bigrams={
    labels: Object?.keys(vis?.bigrams || {}),
    datasets: [
      {
        label: "Occurances of the token",
        borderWidth: 1,
        data: Object?.values(vis?.bigrams || {}),
        backgroundColor: "rgba(0,255 ,0, 0.2)",
        borderColor: "rgba(0, 255, 0,0.7)",
      },
    ],
  }
  const bigramsWithStopWords={
    labels: Object?.keys(vis?.bigramsWithStopwords || {}),
    datasets: [
      {
        label: "Occurances of the token",
        borderWidth: 1,
        data: Object?.values(vis?.bigramsWithStopwords || {}),
        backgroundColor: "rgba(0,255 ,0, 0.2)",
        borderColor: "rgba(0, 255, 0,0.7)",
      },
    ],
  }
  return (
    <div className="visualizations-panel">
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
      {vis.loading ? (
        <div className="spinner-div">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="chart-panel-1">
            <Card className="card-bar">
              <CardContent>
                <BarChart data={data} text="Monthly Feature Releases" />
              </CardContent>
            </Card>
          </div>
          <div className="chart-panel">
          <Card className="card">
              <CardContent>
                <BarChart
                  data={top15WithoutStopWords}
                  text="Most Frequently occured words(top15) with stopwords"
                />
              </CardContent>
            </Card>
          <Card className="card">
              <CardContent>
                <BarChart
                  data={top15}
                  text="Most Frequently occured words(top15) without stopwords"
                />
              </CardContent>
            </Card>
          </div>
          <div className="chart-panel">
          <Card className="card">
              <CardContent>
                <BarChart
                  data={bigramsWithStopWords}
                  text="Most Frequently occured bigrams with stopwords"
                />
              </CardContent>
            </Card>
          <Card className="card">
              <CardContent>
                <BarChart
                  data={bigrams}
                  text="Most Frequently occured bigrams without stopwords"
                />
              </CardContent>
            </Card>
          </div>
          {vis?.wordCloud && (
            <div className="word-cloud">
              <Card className="card">
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                  className="text-word"
                >
                  Word cloud
                </Typography>
                <CardContent>
                  {!!vis?.wordCloud && (
                    <TagCloud tags={vis?.wordCloud} minSize={10} maxSize={65} />
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Visualizations;
