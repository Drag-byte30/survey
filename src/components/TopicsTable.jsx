import React from "react";

const TopicsTable = ({ topics, onVote, headlineId  }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>الموضوع</th>
          <th>نعم (%)</th>
          <th>لا (%)</th>
          <th>التصويت</th>
        </tr>
      </thead>
      <tbody>
        {topics.map((topic, index) => (
          <tr key={topic.id}>
            <td>{topic.name}</td>
            <td>{topic.yesPercentage}%</td>
            <td>{topic.noPercentage}%</td>
            <td style={{display:"flex"}}>
              <button style={{marginLeft:"5px",width:"90px"}} onClick={() => onVote(headlineId, topic.id, "yes")}>
                 نعم✅
              </button>
              <button onClick={() => onVote(headlineId, topic.id, "no")}>
                 لا❌ 
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopicsTable;
