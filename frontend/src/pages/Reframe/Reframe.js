import React, { useState, useRef, useEffect } from "react";
import styles from "./Reframe.module.scss";
import axios from "axios";
import LoadingSkeleton from "../../components/Card/LoadingSkeleton";
import { backendURL, frontendURL } from "../../assets/constants";
import Card from "../../components/Card/Card";
import { Icon } from "@iconify/react";
import CustomReframeCard from "../../components/Card/CustomReframeCard";

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
  const mock = false; // TODO Set to false to make real API call

  const getReframes = async () => {
    setFetching(true);
    if (mock) {
      const extraReframes = [
        "You are doing the best you can.",
        "It's okay to feel this way.",
        "You are not alone.",
      ];
      setReframes((currentReframes) => [...currentReframes, ...extraReframes]);
      setFetching(false);
      return;
    } else {
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
    }
  };

  useEffect(() => {
    if (!called.current) {
      console.log("fetching reframes");
      called.current = true;
      getReframes();
    }
  }, []);

  const clickHandler = (reframeText, index) => {
    const updatedSelections = [...selections];
    updatedSelections[currentPage] = reframeText;
    setSelections(updatedSelections);
    setSelected(index);
  };

  return (
    <div className={styles.container}>
      {mock && <div className="text-red-600">MOCK CALL</div>}
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
        {reframes.length > 0 && (
          <>
            {reframes.map((reframe, index) => (
              <Card
                key={index}
                title={`Reframe ${index + 1}`}
                description={reframe}
                selected={index === selected}
                onClick={() => clickHandler(reframe, index)}
              />
            ))}
            <CustomReframeCard
              selected={selected === reframes.length}
              onClick={clickHandler}
              index={reframes.length}
            />
          </>
        )}
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
