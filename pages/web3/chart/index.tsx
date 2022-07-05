import type { NextPage } from "next";
import { DatePicker } from "antd";
import {} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
const Home: NextPage = () => {
  const [data, setData] = useState([]);
  const tags = ["7D", "1M", "3M", "6M", "1Y", "ALL"];
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    // xAxis: {
    //   type: 'time',
    // },
    // yAxis: {
    //   label: {
    //     // 数值格式化为千分位
    //     formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    //   },
    // },
  };
  return (
    <div className=" w-full h-full p-4">
      <div className=" text-center w-full text-xl mb-3">
        0x34…3d5x, 0x12…1s4d Total Assets vs. Daily PnL historical chart
      </div>
      <div className=" flex justify-between">
        <div className=" flex text-center">
          {tags.map((tag) => (
            <div className=" w-16">{tag}</div>
          ))}
        </div>
        <div>
          <DatePicker.RangePicker />
        </div>
      </div>
      <Line {...config}></Line>
    </div>
  );
};

export default Home;
