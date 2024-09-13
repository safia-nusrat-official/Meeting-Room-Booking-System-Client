import SearchBar from "@/components/shared/SearchBar";
import {
  TQueryArgs,
  useGetAllAvailableRoomsQuery,
} from "@/redux/api/rooms.api";
import { TRoom } from "@/types/room.types";
import React, { useState } from "react";
import { RoomCard } from "./RoomCard";
import {
  Button,
  ConfigProvider,
  Divider,
  Pagination,
  Radio,
  Select,
  SelectProps,
  Skeleton,
  Slider,
  Spin,
} from "antd";
import { TMeta } from "@/types";
import { GoPeople } from "react-icons/go";
import { IoClose, IoCloseCircle } from "react-icons/io5";

const Rooms = () => {
  const [current, setCurrent] = useState(1);
  const [filters, setFilters] = useState<TQueryArgs[]>([]);
  const [allowFilters, setAllowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");
  const [priceRanges, setPriceRanges] = useState({ min: 125, max: 625 });

  const { data, isLoading, isFetching } = useGetAllAvailableRoomsQuery([
    { key: "limit", value: "6" },
    { key: "page", value: `${current}` },
    { key: "searchTerm", value: searchTerm },
    {
      key: "sort",
      value: `${sortDirection === "ascending" ? sort : `-${sort}`}`,
    },
    ...filters,
  ]);
  const sortQueries: SelectProps["options"] = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Price",
      value: "pricePerSlot",
    },
    {
      label: "Rating",
      value: "rating",
    },
  ];

  const meta: TMeta = data?.meta || {};
  const roomData: TRoom[] = !isLoading ? data?.data : [];

  return (
    <div className="md:p-12 relative bg-white p-8 md:grid-cols-4 gap-6 grid">
      <div className="flex relative md:sticky md:h-screen left-0 md:top-[8rem] flex-col md:col-span-1 col-span-4 ">
        <SearchBar setSearchTerm={setSearchTerm}></SearchBar>
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                railBg: "#ccc",
              },
              Tooltip: {},
            },
          }}
        >
          <div className="my-4 text-slate-400 ">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-slate-800 font-semibold">
                Filter By Price
              </h3>
              <IoCloseCircle
                className="text-xl hover:scale-125 transition-all"
                onClick={() => {
                  setPriceRanges({ min: 20, max: 700 });
                  setFilters([
                    ...filters
                      .filter((item) => item.key !== "minPrice")
                      .filter((item) => item.key !== "maxPrice"),
                  ]);
                }}
              ></IoCloseCircle>
            </div>
            <p className="mb-2">Drag the slider to change price ranges</p>
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">$ {20}</p>
              <Slider
                defaultValue={[priceRanges.min, priceRanges.max]}
                min={20}
                max={700}
                step={50}
                range
                style={{ width: "100%" }}
                tooltip={{
                  defaultOpen: allowFilters,
                  placement: "bottom",
                  formatter: (value) => `$ ${value}`,
                }}
                onChange={(values: any) => {
                  setPriceRanges({ min: values[0], max: values[1] });
                  setFilters([
                    ...filters
                      .filter((item) => item.key !== "priceMax")
                      .filter((item) => item.key !== "priceMin"),
                    { key: "priceMin", value: `${values[0]}` },
                    { key: "priceMax", value: `${values[1]}` },
                  ]);
                }}
              />
              <p className="whitespace-nowrap">$ {700}</p>
            </div>
          </div>

          <div className="my-6 text-slate-400 ">
            <div className="flex justify-between">
              <h3 className="text-xl text-slate-800 font-semibold">
                Filter By Capacity
              </h3>
            </div>
            <p className="mb-2">Drag the slider to change capacity ranges</p>
            <div className="flex items-center gap-2">
              <GoPeople className="text-xl text-slate-800"></GoPeople>
              <Slider
                defaultValue={[15, 300]}
                range
                min={5}
                max={500}
                step={3}
                style={{ width: "100%" }}
                tooltip={{
                  defaultOpen: true,
                  placement: "bottom",
                }}
                onChange={(values: any) =>
                  setFilters([
                    ...filters
                      .filter((item) => item.key !== "minCapacity")
                      .filter((item) => item.key !== "maxCapacity"),
                    { key: "minCapacity", value: `${values[0]}` },
                    { key: "maxCapacity", value: `${values[1]}` },
                  ])
                }
              />
            </div>
          </div>
        </ConfigProvider>

        <Button
          type="primary"
          className="mt-6"
          onClick={() => {
            setAllowFilters(false);
            setFilters([]);
          }}
        >
          Clear Fliters <IoClose className="text-xl"></IoClose>
        </Button>
      </div>

      <div className="md:col-span-3 relative md:col-start-2 col-span-4 grid md:grid-cols-3 grid-cols-2 ">
        <div className="flex md:flex-row flex-col-reverse md:items-center text-slate-400 justify-between items-start col-span-3">
          {isLoading ? (
            <Skeleton.Node active></Skeleton.Node>
          ) : (
            <p className="my-6 md:my-0">
              Showing {meta.totalDocuments > 1 && "all"} {meta.totalDocuments + " "}
              result
              {meta.totalDocuments > 1 && "s"}
            </p>
          )}
          <ConfigProvider
            theme={{
              components: {
                Radio: {
                  colorPrimary: "#184E77",
                },
                Select: {
                  paddingContentVertical: 4,
                  optionSelectedBg: "#eee",
                  optionSelectedColor: "#184E77",
                  
                },
              },
            }}
          >
            <div className="flex md:flex-nowrap flex-wrap items-center">
              <div className="flex w-full md:w-fit justify-between items-center"><p>Sort By:</p>
              <Select
                className="md:ml-2 md:mr-4 md:mb-0 mb-4 m-0 border-0"
                defaultValue={sort}
                options={sortQueries}
                popupMatchSelectWidth={false}
                onChange={(value) => setSort(value)}
              ></Select></div>

              <Radio.Group
                onChange={(value: any) => setSortDirection(value.target.value)}
                defaultValue={sortDirection}
              >
                <Radio value={"ascending"}>Ascending</Radio>
                <Radio value={"descending"}>Descending</Radio>
              </Radio.Group>
            </div>
          </ConfigProvider>
        </div>
        <Divider className="col-span-3 mb-4 mt-0 md:my-6"></Divider>
        <div className="grid relative md:col-span-3 col-span-2 md:grid-cols-3 grid-cols-1 gap-4">
          {isFetching && <Spin size="large" fullscreen></Spin>}
          {roomData &&
            roomData.map((room) => (
              <RoomCard key={room._id as string} room={room}></RoomCard>
            ))}
          {
            searchTerm && roomData && roomData.length<1 && <div className="p-6">No results</div>
          }
        </div>
        {meta && (
          <Pagination
            className="mt-6 mx-auto col-span-3"
            total={meta?.totalDocuments}
            pageSize={meta?.limit}
            current={current}
            onChange={(value: number) => setCurrent(value)}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default Rooms;
