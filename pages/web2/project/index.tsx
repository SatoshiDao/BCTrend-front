import type { NextPage } from "next";
import { Button, Table, Divider, AutoComplete } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
const Project: NextPage = () => {
  const [counts, setCounts] = useState<string[]>(["Bitcoin", "Ethereum"]);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const titles = [
    "Number of transactions in blockchain per day",
    "Average block size",
    "Number of unique addresses per day",
    "Average mining difficulty per day",
    "Average hashrate per day",
    "Average price,per day, USD",
    "Mining Profitability",
    "Sent coins in USD per day",
    "Average transaction fee, USD",
    "Median transaction fee, USD",
    "Average block time (minutes)",
    "Market Capitalization, USD",
    "Avg. Transaction Value, USD",
    "Median transaction value, USD",
    "Tweets per day",
    "Google Trends to “Bitcoin”@ 2012-01-01",
    // "Number of unique addresses per day",
    "Top 100 Richest Addresses to Total coins%",
    "Average Fee Percentage in Total Block Reward",
  ];
  const [dataSource, setDataSource] = useState(
    titles.map((title) => ({ title,key:title }))
  );
  const addCount = () => {
    if (counts.length < 5) {
      setCounts([...counts, ""]);
    }
  };

  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  const onSearch = (searchText: string) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };
  const onChange = (data: string, Index: number) => setCounts(counts.map((count,index)=>index===Index?data:count))
  const columns = useMemo(() => {
    const calCounts = counts
      .filter((count) => count !== "" && count !== undefined)
      .map((count) => ({
        title: <div className=" text-gray-600  font-normal">{count}</div>,
        dataIndex: "count1",
        key: "count1",
      }));
    return [
      {
        title: "Project",
        key: "title",
        render: (item: any) => (
          <span className=" text-black font-semibold">{item.title}</span>
        ),
      },
      ...calCounts,
    ];
  }, [counts]);
  return (
    <div className=" w-full h-full p-4">
      <div className=" w-full flex items-center">
        {counts.map((count: string, index: number) => (
          <div className=" mr-2" key={index}>
            <AutoComplete
              options={options}
              style={{ width: 180 }}
              onSearch={onSearch}
              onChange={(e) => onChange(e, index)}
              allowClear
              defaultValue={count}
              className=" mr-2"
              disabled
            />
            {index !== counts.length - 1 ? "VS." : ""}
          </div>
        ))}
      </div>
      <Divider />
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          tableLayout="fixed"
        />
      </div>
    </div>
  );
};

export default Project;
