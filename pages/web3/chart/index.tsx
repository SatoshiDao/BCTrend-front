import type { NextPage } from "next";
import { Button, Input, Table, Divider } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
const Home: NextPage = () => {
  const [counts, setCounts] = useState<string[]>(["11111", "2222222"]);
  const dataSource = [
    {
      key: "1",
      title: "Total assets",
      count1: "100",
      count2: "100",
    },
    {
      key: "2",
      title: "Daily PnL",
      count1: "200",
      count2: "100",
    },
    {
      key: "3",
      title: "Daily PnL Ratio",
      count1: "300",
      count2: "100",
    },
    {
      key: "4",
      title: "Daily Txns",
      count1: "400",
      count2: "100",
    },
    {
      key: "5",
      title: "Stable Coin%",
      count1: "500",
      count2: "100",
    },
    {
      key: "6",
      title: "7/30/90 Days Activity",
      count1: "600",
      count2: "100",
    },
  ];

  const columns = [
    {
      title: "Adress",
      key: "title",
      render: (item: any) => (
        <span className=" text-black font-semibold">{item.title}</span>
      ),
    },
    {
      title:<div className=" text-gray-600  font-normal">11111111</div>,
      dataIndex: "count1",
      key: "count1",
    },
    {
      title:<div className=" text-gray-600  font-normal">2222222</div>,
      dataIndex: "count2",
      key: "count2",
    },
  ];
  const addCount = () => {
    if (counts.length < 5) {
      setCounts([...counts, ""]);
    }
  };
  return (
    <div className=" w-full h-full p-4">
      <div className=" w-full flex items-center">
        {counts.map((count: string, index: number) => (
          <div className=" mr-2" key={count}>
            <Input
              allowClear
              className=" w-36 mr-1"
              defaultValue={count}
            ></Input>
            {index !== counts.length - 1 ? "vs." : ""}
          </div>
        ))}
        <Button
          shape="circle"
          icon={<PlusCircleOutlined />}
          size="small"
          className=" text-xl flex justify-center items-center border-0  ml-1"
          onClick={addCount}
          disabled={counts.length === 5 ? true : false}
        ></Button>
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

export default Home;
