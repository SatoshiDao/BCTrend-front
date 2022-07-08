import type { NextPage } from "next";
import { Button, DatePicker, Select, Spin } from "antd";
import { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import dayjs from "dayjs";
import { formatCount } from "../../../utils";
import { CloseOutlined } from "@ant-design/icons";
import useRequest from "../../../utils/hooks/useRequest";
import { useRouter } from "next/router";
import moment from "moment";
const Home: NextPage = () => {
  const tags = ["7D", "1M", "3M", "6M", "1Y", "ALL"];
  const chartOptions = [
    {
      label: "Total assets",
      value: "total_asset",
      title: "Total assets",
    },
    {
      label: "Daily PnL",
      value: "daily_pnl",
      title: "Daily PnL",
    },
    {
      label: "Daily PnL Ratio",
      value: "pnl_ratio",
      title: "Daily PnL Ratio",
    },
    {
      label: "Daily Txns",
      value: "daily_tnx",
      title: "Daily Txns",
    },
    {
      label: "Stable Coin%",
      value: "stable_coin",
      title: "Stable Coin%",
    },
  ];
  const [data, setData] = useState<any[]>([]);
  const [tag, setTag] = useState("1Y");
  const [title, setTitle] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<[string, string]>([
    dayjs().subtract(1, "years").format("YYYY/MM/DD"),
    dayjs().format("YYYY/MM/DD"),
  ]);
  const [chartColum, setChartColum] = useState("total_asset");
  const [compareColum, setCompareColum] = useState("");
  const { query } = useRouter();
  const [counts, setCounts] = useState([
    { id: 1, label: query.address },
    { id: 2, label: query.address },
  ]);
  // useEffect(() => {
  //   (() => {
  //     axios({
  //       url: `http://81.68.236.10:10086/?variable=${chartColum}&address=0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea`,
  //       method: "GET",
  //       headers: {
  //         Authorization,
  //       },
  //     });
  //   })();
  // }, [chartColum]);
  const res = useRequest({
    url: `http://81.68.236.10:10086/?variable=${chartColum}&address=0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea`,
    method: "GET",
  });
  const config = {
    data,
    xField: "date",
    yField: "value",
    seriesField: "type",
    xAxis: {
      type: "time",
      nice: true,
      tickCount: 20,
    },
    smooth: true,
  };
  const changeDate = (tag: string) => {
    setTag(tag);
    const now = dayjs().format("YYYY/MM/DD");
    switch (tag) {
      case "7D":
        return setDate([dayjs().subtract(7, "d").format("YYYY/MM/DD"), now]);
      case "1M":
        return setDate([dayjs().subtract(30, "d").format("YYYY/MM/DD"), now]);
      case "3M":
        return setDate([dayjs().subtract(90, "d").format("YYYY/MM/DD"), now]);
      case "6M":
        return setDate([dayjs().subtract(180, "d").format("YYYY/MM/DD"), now]);
      case "1Y":
        return setDate([
          dayjs().subtract(1, "years").format("YYYY/MM/DD"),
          now,
        ]);
      default:
        return ;
    }
  };
  console.log(counts, query.address);
  return (
    <div
      className=" w-full h-full p-4 px-9 pb-44"
      style={{ border: "1px solid #333" }}
    >
      <Spin spinning={loading}>
        <div className=" text-center w-full text-xl mb-3">{title}</div>
        <div className=" flex justify-between mb-3">
          <div className=" flex text-center w-80 justify-between">
            {tags.map((item) => (
              <div
                className=" w-10 rounded-sm flex justify-center items-center"
                style={{
                  background: item === tag ? "#1890ff" : "#fff",
                  color: item === tag ? "#fff" : "#333",
                }}
                key={item}
                onClick={() => changeDate(item)}
              >
                {item}
              </div>
            ))}
          </div>
          <div>
            <DatePicker.RangePicker
              value={[moment(date[0]), moment(date[1])]}
              onChange={(e: any) =>
                setDate([
                  dayjs(e[0] as unknown as string).format("YYYY/MM/DD"),
                  dayjs(e[1] as unknown as string).format("YYYY/MM/DD"),
                ])
              }
            />
          </div>
        </div>
        <Line {...config}></Line>
        <div className=" mt-8 ml-8 flex">
          {counts.map((count) => (
            <Button
              key={count.id}
              type="text"
              className=" mr-2 w-28 h-8 flex"
              style={{
                backgroundColor: counts.includes(count)
                  ? "rgba(24, 144, 255, 1)"
                  : "#FFF",
                color: counts.includes(count) ? "#FFF" : "#333",
              }}
              // onClick={() =>
              //   types.includes("BTC")
              //     ? setTypes(types.filter((type) => type !== "BTC"))
              //     : setTypes([...types, "BTC"])
              // }
              icon={
                <div className="w-28 flex items-center h-8 p-2 pb-4 ">
                  <div className=" mr-1">
                    {formatCount(query.address as string)}
                  </div>
                  <CloseOutlined width="14" />
                </div>
              }
            ></Button>
          ))}
        </div>
        <div className=" flex justify-between mt-10 px-8">
          <div className=" flex items-center">
            <div>Chart:</div>
            <Select
              options={chartOptions}
              className=" w-80 ml-2"
              defaultValue={chartColum}
              placeholder="Avg. Transaction Value"
              onChange={(value) => setChartColum(value)}
              style={{ width: "330px" }}
            />
          </div>
          <div className=" flex  items-center">
            <div>Compare with:</div>
            <Select
              options={chartOptions}
              defaultValue={compareColum}
              className=" w-80 ml-2"
              placeholder="Sent in USD"
              style={{ width: "330px" }}
              onChange={(value) => setCompareColum(value)}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Home;
