import React, { useEffect, useState } from "react";
import IntensityChart from "./IntensityChart";
import LikelihoodChart from "./LikelihoodChart";
import RelevanceChart from "./RelevanceChart";
import YearChart from "./YearChart";
import CountryChart from "./CountryChart";
import TopicsChart from "./TopicsChart";
import DataTable from "./DataTable";

const Dashboard = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({
    endYear: "",
    topics: "",
    sector: "",
    region: "",
    pest: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  useEffect(() => {
    let result = data.filter((item) => {
      return (
        item.end_year.includes(filters.endYear) &&
        (filters.topics === "" || item.topic.includes(filters.topics)) &&
        (filters.sector === "" || item.sector.includes(filters.sector)) &&
        (filters.region === "" || item.region.includes(filters.region)) &&
        (filters.pest === "" || item.pestle.includes(filters.pest)) &&
        (filters.source === "" || item.source.includes(filters.source)) &&
        (filters.swot === "" || item.swot.includes(filters.swot)) &&
        (filters.country === "" || item.country.includes(filters.country)) &&
        (filters.city === "" || item.city.includes(filters.city))
      );
    });

    setFilteredData(result);
  }, [data, filters]);

  return (
    <div>
      <div style={{ textAlign: "center", margin: 0 }}>
        <h1>Data Visualization Dashboard</h1>
      </div>
      <div style={{ textAlign: "center", margin: "0px", padding: "5px" }}>
        <div>
          {/* Filters */}

          <label style={{ margin: "5px" }} htmlFor="endYear">
            End Year:
          </label>
          <input
            type="text"
            id="endYear"
            value={filters.endYear}
            onChange={(e) => handleFilterChange("endYear", e.target.value)}
          />

          <label style={{ margin: "5px" }} htmlFor="topics">
            Topics:
          </label>
          <select
            id="topics"
            value={filters.topics}
            onChange={(e) => handleFilterChange("topics", e.target.value)}
          >
            <option value="">Select Topic</option>
            {Array.from(new Set(filteredData.map((item) => item.topic))).map(
              (topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              )
            )}
          </select>

          <label style={{ margin: "5px" }} htmlFor="sector">
            Sector:
          </label>
          <select
            id="sector"
            value={filters.sector}
            onChange={(e) => handleFilterChange("sector", e.target.value)}
          >
            <option value="">Select Sector</option>
            {Array.from(new Set(filteredData.map((item) => item.sector))).map(
              (sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              )
            )}
          </select>

          <label style={{ margin: "5px" }} htmlFor="region">
            Region:
          </label>
          <select
            id="region"
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
          >
            <option value="">Select Region</option>
            {Array.from(new Set(filteredData.map((item) => item.region))).map(
              (region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              )
            )}
          </select>

          <label style={{ margin: "5px" }} htmlFor="pest">
            PEST:
          </label>
          <select
            id="pest"
            value={filters.pest}
            onChange={(e) => handleFilterChange("pest", e.target.value)}
          >
            <option value="">Select PEST</option>
            {Array.from(new Set(filteredData.map((item) => item.pestle))).map(
              (pest) => (
                <option key={pest} value={pest}>
                  {pest}
                </option>
              )
            )}
          </select>
        </div>

        <label style={{ margin: "5px" }} htmlFor="source">
          Source:
        </label>
        <select
          id="source"
          value={filters.source}
          onChange={(e) => handleFilterChange("source", e.target.value)}
        >
          <option value="">Select Source</option>

          {Array.from(new Set(filteredData.map((item) => item.source))).map(
            (source) => (
              <option key={source} value={source}>
                {source}
              </option>
            )
          )}
        </select>

        <label style={{ margin: "12px" }} htmlFor="country">
          Country:
        </label>
        <select
          id="country"
          value={filters.country}
          onChange={(e) => handleFilterChange("country", e.target.value)}
        >
          <option value="">Select Country</option>
          {Array.from(new Set(filteredData.map((item) => item.country))).map(
            (country) => (
              <option key={country} value={country}>
                {country}
              </option>
            )
          )}
        </select>
      </div>
      <div style={{ padding: "10px" }}></div>
      <div style={{ display: "flex", textAlign: "center" }}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "15px",
              border: "2px solid black",
              padding: "2px",
            }}
            id="intensity-chart"
          >
            <h5 style={{ marginTop: "8%", marginLeft: "1%" }}>
              i<br />n<br />t<br />e<br />n<br />s<br />i<br />t<br />i<br />e
              <br />s
            </h5>
            <IntensityChart data={filteredData} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "15px",
              border: "2px solid black",
              padding: "2px",
            }}
            id="likelihood-chart"
          >
            <h5 style={{ marginTop: "8%", marginLeft: "1%" }}>
              l<br />i<br />k<br />e<br />l<br />i<br />h<br />o<br />o<br />d
            </h5>
            <LikelihoodChart data={filteredData} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "15px",
              border: "2px solid black",
              padding: "2px",
            }}
            id="relevance-chart"
          >
            <h5 style={{ marginTop: "8%", marginLeft: "1%" }}>
              r<br />e<br />l<br />e<br />v<br />a<br />n<br />c<br />e<br />
            </h5>
            <RelevanceChart data={filteredData} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "15px",
              border: "2px solid black",
              padding: "2px",
            }}
            id="year-chart"
          >
            <h5 style={{ marginTop: "20%", marginLeft: "1%" }}>
              y<br />e<br />a<br />r<br />s
            </h5>
            <YearChart data={filteredData} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "15px",
              border: "2px solid black",
              padding: "2px",
            }}
            id="country-chart"
          >
            <h5 style={{ marginTop: "15%", marginLeft: "1%" }}>
              c<br />o<br />u<br />n<br />t<br />r<br />i<br />e<br />s
            </h5>
            <CountryChart data={filteredData} />
          </div>
        </div>
        <div>
          <div id="topics-chart">
            <TopicsChart data={filteredData} />
          </div>
          <div style={{ marginLeft: "8%" }} id="data-table">
            <DataTable data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
