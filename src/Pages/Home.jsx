import React, { useState, useEffect } from "react";
import Headlines from "../components/Headlines";
import TopicsTable from "../components/TopicsTable";

const Home = () => {
  const [selectedHeadline, setSelectedHeadline] = useState(null);
  const [surveyData, setSurveyData] = useState([]);

  // Fetch survey data from the backend
  useEffect(() => {
    fetch("https://backend-cenv.onrender.com/survey")
      .then(res => res.json())
      .then(data => setSurveyData(data.headlines))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // Function to handle voting
  const handleVote = (headlineId, topicId, vote) => {
    fetch("https://backend-cenv.onrender.com/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headlineId, topicId, vote })
    })
      .then(res => res.json())
      .then(updatedData => {
        if (updatedData.updatedTopic) {
          // ✅ Update state without refreshing
          setSurveyData(prevData => {
            return prevData.map(headline => {
              if (headline.id === headlineId) {
                return {
                  ...headline,
                  topics: headline.topics.map(topic =>
                    topic.id === topicId ? updatedData.updatedTopic : topic
                  )
                };
              }
              return headline;
            });
          });
        } else {
          console.error("Invalid response from backend:", updatedData);
        }
      })
      .catch(err => console.error("Error voting:", err));
  };
  

  return (
    <div className="main">
      {/* Centered Main Title */}
      <div className="title">
        <h1>الجمهورية الجزائرية الديمقراطية الشعبية</h1>
      </div>

      {/* Centered Subtitle */}
      <div className="subtitle">
        <h2>تطبيقة عملية سبر الاراء و استطلاع الرأي</h2>
      </div>

      {/* Grid for Headlines */}
      <div className="headlines">
        {surveyData.map(section => (
          <div
            key={section.id}
            className="topics"
            onClick={() =>
              setSelectedHeadline(selectedHeadline === section.id ? null : section.id)
            }
          >
            <Headlines title={section.headline} />
            {selectedHeadline === section.id && (
              <TopicsTable topics={section.topics} onVote={handleVote} headlineId={section.id} />
            )}
          </div>
        ))}
      </div>

      {/* Footer for Voting Summary */}
      <div className="footer">
        <h2>تقييم الوضعية</h2>
        <div className="inner">
          <h3 style={{ marginLeft: "80px" }}> نــــعم % </h3>
          <h3> لا %</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
