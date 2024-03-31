import React, { useState, useRef, useEffect } from "react";
import styles from "./Reframe.module.scss";
import axios from "axios";
import LoadingSkeleton from "../../components/Card/LoadingSkeleton";
import { backendURL, frontendURL } from "../../assets/constants";
import Card from "../../components/Card/Card";
import { Icon } from "@iconify/react";

const Reframe = ({
  selections,
  setSelections,
  currentPage,
  thought,
  situation,
  distortions,
}) => {
  const [reframes, setReframes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fetching, setFetching] = useState(true);
  const called = useRef(false);

  const getReframes = async () => {
    setFetching(true);
    axios
      .post(`${backendURL}/reframes/`, {
        curr_situation: situation,
        curr_thought: thought,
        distortions: distortions,
      })
      .then((response) => {
        setFetching(false);
        setReframes((currentReframes) => [
          ...currentReframes,
          ...response.data.reframes,
        ]);
      })
      .catch((error) => {
        console.error("Error fetching reframes:", error);
      });
  };

  useEffect(() => {
    console.log("Component mounted or updated");
    console.log("Called:", called.current);
    if (!called.current) {
      console.log("fetching reframes");
      called.current = true;
      getReframes();
    }
  }, []);

  useEffect(() => {
    const updatedSelections = [...selections];
    updatedSelections[currentPage] = selected;
    setSelections(updatedSelections);
  }, [selected]);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>Reframe Your Thinking</h1>
        <div className={styles.subHeader}>
          Here are a few reframes you may consider. Click on the reframe you
          find most relatable and helpful to start working on it or add your own
          reframe.
        </div>
        {fetching && (
          <div className={styles.highlight}>
            {" "}
            <span className="font-bold">Note</span>: Reframing suggestions may
            take up to 30 seconds to load{" "}
          </div>
        )}
      </div>
      <div className={styles.reframes}>
        {
          reframes.map((reframe, index) => (
            <Card
              key={index}
              title={`Reframe ${index + 1}`}
              description={reframe}
              selected={index === selected}
              onClick={() => setSelected(index)} // Corrected this line
            />
          ))}
        {fetching &&
          Array(2)
            .fill()
            .map((_, index) => <LoadingSkeleton key={index} />)}
      </div>
      <div className={styles.plus} onClick={getReframes}>
        <>
          <Icon icon="iconamoon:sign-plus-bold" className={styles.pmIcon} />
          Generate More Reframes{" "}
        </>
      </div>
    </div>
  );
};

export default Reframe;
