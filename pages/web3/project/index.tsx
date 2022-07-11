import { Button, Input, Table, Divider,Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState, useEffect, useMemo } from "react";
import request from "../../../utils/request";
import { formatCount } from "../../../utils";
interface Count {
  count: string;
  isInput: boolean;
}
const Home = ({ data }: { data: any[] }) => {
  //初始化counts
  const [counts, setCounts] = useState<Count[]>(
    data.map((item) => ({ count: item.address, isInput: false }))
  );
  const [loading,setLoading]=useState(false)
  const [dataSource, setDataSource] = useState<any[]>([
    {
      id: "total_asset",
      title: "Total assets",
    },
    {
      id: "daily_pnl",
      title: "Daily PnL",
    },
    {
      id: "pnl_ratio",
      title: "Daily PnL Ratio",
    },
    {
      id: "daily_tnx",
      title: "Daily Txns",
    },
    {
      id: "stable_coin",
      title: "Stable Coin%",
    },
    {
      id: "days_activity",
      title: "7/30/90 Days Activity",
    },
  ]);
  const [concatData, setConcatData] = useState(data);

  const columns = useMemo(() => {
    const extendCo = counts.filter((item:Count)=>item.count!=='').map((item: Count) => ({
      title:<a href={`./chart?address=${item.count}`}>{formatCount(item.count)}</a>,
      key: item.count,
      render: (Item: any) => (
        <span className=" text-black font-semibold">
          {Item[item.count] || "0"}
        </span>
      ),
    }));
    return [
      {
        title: "Address",
        key: "title",
        render: (item: any) => (
          <span className=" text-black font-semibold">{item.title}</span>
        ),
      },
      ...extendCo,
    ];
  }, [counts]);
  const addCount = () => {
    if (counts.length < 5) {
      setCounts([...counts, { count: "", isInput: false }]);
    }
  };

  useEffect(() => {
    (() => {
      setDataSource(
        dataSource?.map((Item) => {
          let keys: { [key: string]: any } = {};
          concatData.map((item) => {
            if (!keys[item.address]) {
              keys[item.address] = item[Item.id]||0;
            }
          });
          return { ...Item, ...keys };
        })
      );
    })();
  }, [concatData]);
  const getInfoByAddress = async ({ target }: { target: any }) => {
    if(target.value){
      setLoading(true)
      //@ts-ignore
      const { result } = await request({
        url: `/`,
        method: "GET",
        params: {
          address: target.value,
        },
      });
      setLoading(false)
      setConcatData([...concatData, { ...result, address: target.value }]);
    }
    
  };
  return (
    <div
      className=" w-full h-full py-8 px-4 rounded-sm"
      style={{ border: "1px solid #333" }}
    >
      <div className=" w-full flex items-center">
        {counts.map((count: Count, index: number) => (
          <div className=" mr-2  w-36 h-8 flex items-center" key={index}>
            {count.isInput ? (
              <Input
                allowClear
                className=" w-36 mr-1"
                defaultValue={count.count}
                onBlur={(e) => {
                  setCounts(
                    counts.map((item: Count, Index: number) => ({
                      ...item,
                      isInput: Index === index ? false : item.isInput,
                      count: Index === index ? e.target.value : item.count,
                    }))
                  );
                  getInfoByAddress(e);
                }}
              ></Input>
            ) : (
              <div
                className="h-8 w-36  flex items-center rounded-sm pl-2"
                style={{ border: "1px solid #ccc" }}
                onClick={() =>
                  setCounts(
                    counts.map((item: Count, Index: number) => ({
                      ...item,
                      isInput: Index === index ? true : item.isInput,
                    }))
                  )
                }
              >
                {formatCount(count.count)}
              </div>
            )}
            <div className=" ml-1">
              {index !== counts.length - 1 ? "vs." : ""}
            </div>
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
          rowKey="id"
          loading={loading}
        />
      </div>
    </div>
  );
};
export async function getStaticProps(context: any) {
  try {
    //@ts-ignore
    const { result } = await request({
      url: `/`,
      params: {
        address: "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea",
      },
      method: "GET",
    });
    return {
      props: {
        data: result
          ? [
              {
                ...result,
                address: "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea",
              },
            ]
          : [],
      },
    };
  } catch (error) {
    return {
      props: { data: [] },
    };
  }
}
export default Home;
