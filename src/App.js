import { useEffect, useState } from 'react';
import './App.css';

const api =
  'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(api);
      let data = await response.json();
      setData(data['Time Series (5min)']);
    };

    fetchData();
  }, []);

  const Row = ({ date, data }) => {
    console.log({ data });
    return (
      <tr>
        <td>{date}</td>
        {Object.values(data).map((val) => (
          <td>{val}</td>
        ))}
      </tr>
    );
  };

  return (
    <div className='App'>
      <table cellPadding={10}>
        <thead>
          <tr>
            <th>DateTime</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.keys(data).map((value, index, array) => {
              let d = data[value]; //value from the date key
              return <Row date={value} data={d} />;
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;