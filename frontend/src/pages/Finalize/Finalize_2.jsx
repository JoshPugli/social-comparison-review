import React, { useEffect, useState } from "react";
import styles from "./Finalize.module.scss";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { backendURL } from "../../assets/constants";
import EditReframeCard from "../../components/Card/EditReframeCard";
import LoadingSkeleton from "../../components/Card/LoadingSkeleton";

const Reframe = ({ selections, setSelections, currentPage, handleForward }) => {
  console.log(handleForward); // Should log the function, not 'undefined'

  const reframe = selections[currentPage - 1];
  const [currReframe, setCurrReframe] = useState(reframe);
  const [helpOption, setHelpOption] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [helpReframe, setHelpReframe] = useState(null);

  const getNewReframe = async (prompt) => {
    setLoading(true);
    await axios
      .post(`${backendURL}/update-reframe/`, {
        curr_situation: selections[3],
        curr_thought: selections[1],
        distortions: selections[4],
        current_reframe: reframe,
        user_request: prompt,
      })
      .then((response) => {
        setHelpReframe(response.data.new_reframe);
      })
      .catch((error) => {
        console.error("Error fetching reframes:", error);
      });
    setLoading(false);
  };

  useEffect(() => {
    let selectionsCopy = [...selections];
    selectionsCopy[currentPage] = currReframe;
    setSelections(selectionsCopy);
  }, [currReframe]);

  const handleContextChange = (event) => {
    setContext(event.target.value);
  };

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setHelpOption(selectedOption);

    switch (selectedOption) {
      case "relatable":
        break;
      case "nextSteps":
        getNewReframe(
          "Generate a step-by-step guide based on current situation and thoughts."
        );
        break;
      case "support":
        getNewReframe(
          "Provide support and validation based on the current emotional state."
        );
        break;
      default:
        break;
    }
  };

  const handleFinishReframing = () => {
    let selectionsCopy = [...selections];
    selectionsCopy[currentPage] = currReframe;
    setSelections(selectionsCopy);
    handleForward();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>Reframe Your Thinking</h1>
        <div className={styles.commonLabel}>Continue editing the reframe</div>
        <div className={styles.textAreaContainer}>
          <textarea
            className={styles.textArea}
            value={currReframe}
            onChange={(e) => setCurrReframe(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Type your custom reframe here"
            rows="5" // Set the number of rows here
          />
          <button
            className={styles.buttonInTextArea}
            onClick={handleFinishReframing}
          >
            Finish Reframing and Submit
          </button>
        </div>
        <div className={styles.commonLabel}>
          Get more help with the reframe (optional)
        </div>
        <div className={styles.moreHelpContainer}>
          <span className={styles.wouldLikeToText}>I would like to:</span>
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              displayEmpty
              onChange={handleChange}
              value={helpOption}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="" style={{ color: "grey" }}>
                <em>Select</em>
              </MenuItem>
              <MenuItem value="relatable">
                make it more relatable to my situation
              </MenuItem>
              <MenuItem value="nextSteps">
                figure out the next steps and actions
              </MenuItem>
              <MenuItem value="support">feel supported and validated</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          {helpOption === "relatable" && (
            <div className={styles.textAreaContainer}>
              <textarea
                placeholder="Tell us more about your situation. What other details are important?"
                className={styles.textArea}
                value={context}
                onChange={handleContextChange}
                rows="4"
              ></textarea>
              <button
                className={styles.buttonInTextArea}
                onClick={() =>
                  getNewReframe(
                    `I would like to tailor the reframe to better fit my situation. Here is some other important details about my situation: ${context}`
                  )
                }
              >
                Get New Suggestion
              </button>
            </div>
          )}
          {helpReframe && !loading && (
            <EditReframeCard
              reframe={helpReframe}
              currReframe={currReframe}
              setReframe={setCurrReframe}
            />
          )}
          {loading && <LoadingSkeleton />}
        </div>
      </div>
    </div>
  );
};

export default Reframe;
