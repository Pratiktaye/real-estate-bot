import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function App() {
  const [query, setQuery] = useState('');
  const [summary, setSummary] = useState('');
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleSubmit = async () => {
    const res = await axios.post('/api/analyze/', { query });
    setSummary(res.data.summary);
    setChartData(res.data.chart_data);
    setTableData(res.data.table_data);
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h2>Real Estate Analysis Chatbot</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
        placeholder="Enter query, e.g. Analyze Wakad"
      />
      <button onClick={handleSubmit}>Analyze</button>

      <div style={{ marginTop: 30 }}>
        <h3>Summary</h3>
        <p>{summary}</p>

        <h3>Chart (Avg Price Trend)</h3>
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="avg_price" stroke="#8884d8" />
        </LineChart>

        <h3>Filtered Data</h3>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              {tableData.length > 0 &&
                Object.keys(tableData[0]).map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
