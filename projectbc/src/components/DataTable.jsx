import React from "react";

const DataTable = ({ data }) => {
  return (
    <div>
      <h2>Data Table</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Region</th>
            <th>Country</th>
            <th>Years</th>
          </tr>
        </thead>
        {data.map((item) => {
          return (
            <tbody>
              <tr>
                <td>{item.region ? item.region : "---"}</td>
                <td>{item.country ? item.country : "---"}</td>
                <td>
                  <div>{item.start_year ? item.start_year : "---"}</div>
                  <div>{item.end_year ? item.end_year : "---"}</div>
                </td>
                <td>
                  {item.title.includes("strength")
                    ? <span style={{backgroundColor:"green"}}>"Strength"</span>
                    : "" || item.title.includes("weakness")
                    ? <span style={{backgroundColor:"red"}}>"weakness"</span>
                    : "" || item.title.includes("opportunities")
                    ? <span style={{backgroundColor:"yellow"}}>"opportunities"</span>
                    : "" || item.title.includes("threats")
                    ? <span style={{backgroundColor:"blue"}}>"Threats"</span>
                    : "" || item.url.includes("strength")
                    ? <span style={{backgroundColor:"green"}}>"Strength"</span>
                    : "" || item.url.includes("weakness")
                    ? <span style={{backgroundColor:"red"}}>"weakness"</span>
                    : "" || item.url.includes("opportunities")
                    ? <span style={{backgroundColor:"blue"}}>"opportunities"</span>
                    : "" || item.url.includes("threats")
                    ? <span style={{backgroundColor:"yellow"}}>"Threats"</span>
                    : ""}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default DataTable;
