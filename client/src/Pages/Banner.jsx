import axios from "axios";
import dayjs from "dayjs";
import {Check,Star} from "lucide-react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../Components/Data";
import React, { useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";
import { Circles } from "react-loader-spinner";
import DataTable from "../Components/DataTable";
import { Button, Dropdown, Label, Table, TextInput } from "flowbite-react";
import { Pagination } from "flowbite-react";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";

Chart.register(CategoryScale);

const Banner = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // console.log(currentPage);
  const URL =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_BASE_URL;
  const [list, setList] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.priceRange), 
    datasets: [
      {
        label: "Sold Quantity",
        data: Data.map((data) => (data.userGain)/1000),
        backgroundColor: [
          "rgba(75, 192, 192, 1)","#f3ba3f","#50AF95","#f54291","#2a71d0",               
          "#ff8c42",               
          "#845EC2",               
          "#FF6F91",               
          "#FFC75F"               
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  const [pieData, setPieData] = useState({
    labels: Data.map((data) => data.priceRange), 
    datasets: [
      {
        label: "Category",
        data: Data.map((data) => (data.userGain)/1000),
        backgroundColor: [
          "rgba(75, 192, 192, 1)","#f3ba3f","#50AF95","#f54291","#2a71d0",               
          "#ff8c42",               
          "#845EC2",               
          "#FF6F91",               
          "#FFC75F"               
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  
  const onPageChange = (page) =>{
    setCurrentPage(page);
    setLoading(true);
  } 
  const [month,setMonth] = useState({monthName:'March',monthNumber:3});
  const [search,setSearch] = useState('');
  const [stats,setStats] = useState('')
 
  useEffect(() => {
   
    const fetchEvent = async () => {
      try {
        
        
        const response = await axios.get(
          `${URL}/api/transaction/list?month=${month?.monthNumber}&search=${search}&page=${currentPage}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
       
        setList(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [month,search,currentPage]);

  useEffect(()=>{
    const fetchStats=async()=>{
      try {
        const response = await axios.get(
          `${URL}/api/transaction/combined?month=${month?.monthNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        setStats(response.data?.statics);
        setChartData({
          ...chartData,
          labels:Object.keys(response.data?.barGraph),
          datasets: [
            {
              label: "Sold Quantity",
              data: Object.values(response.data?.barGraph),
              backgroundColor: [
                "rgba(75, 192, 192, 1)",  
                "#f3ba3f",               
                "#50AF95",               
                "#f54291",               
                "#2a71d0",               
                "#ff8c42",               
                "#845EC2",               
                "#FF6F91",               
                "#FFC75F"                
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        })
        setPieData({
          ...pieData,
          labels:Object.keys(response.data?.pieChart),
          datasets: [
            {
              label: "Quantity",
              data: Object.values(response.data?.pieChart),
              backgroundColor: [
                "rgba(75, 192, 192, 1)",  
                "#f3ba3f",               
                "#50AF95",               
                "#f54291",               
                "#2a71d0",               
                "#ff8c42",               
                "#845EC2",               
                "#FF6F91",               
                "#FFC75F"                
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        })
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
    }
    fetchStats();
  },[month])
  // console.log(stats);
  const handleMonth = (monthName, monthNumber) => {

    setMonth({
      monthName: monthName,
      monthNumber: monthNumber,
    });
    setLoading(true);
    setCurrentPage(1);
    
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Circles color="#4fa94d" height={80} width={80} />
  //     </div>
  //   );
  // }
  return (
    <div className="bg-slate-50 min-h-screen">
      <section>
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16 pb-10">
          <div className="flex flex-col lg:flex-col items-center py-20 gap-4">
            <h2 className="relative w-fit text-center tracking-tight items-center justify-center font-bold text-4xl md:text-5xl text-gray-900 !leading-tight mt-2">
              Welcome to <span className="text-green-500">the Your</span> Space!
            </h2>
            <p className="text-gray-600 text-2xl md:text-3xl">
              Let's Enter to my World.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-slate-200">
        <div className="h-full mx-auto py-10 max-w-screen-xl px-2.5 md:px-20">
          <div className="flex w-full justify-between items-end mb-2">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="search" value="Search" />
              </div>
              <TextInput
                value={search}
                name="search"
                onChange={(e)=>{setSearch(e.target.value); setCurrentPage(1)}}
                id="search"
                type="text"
                placeholder="bla bla...."
                required
              />
            </div>
            <div>
            <Dropdown label={month.monthName} value={month} size="lg" dismissOnClick={true}>
            <Dropdown.Item value="1" onClick={() => handleMonth('January',1)}>January</Dropdown.Item>
            <Dropdown.Item value="2" onClick={() => handleMonth('February',2)}>February</Dropdown.Item>
            <Dropdown.Item value="3" onClick={() => handleMonth('March',3)}>March</Dropdown.Item>
            <Dropdown.Item value="4" onClick={() => handleMonth('April',4)}>April</Dropdown.Item>
            <Dropdown.Item value="5" onClick={() => handleMonth('May',5)}>May</Dropdown.Item>
            <Dropdown.Item value="6" onClick={() => handleMonth('June',6)}>June</Dropdown.Item>
            <Dropdown.Item value="7" onClick={() => handleMonth('July',7)}>July</Dropdown.Item>
            <Dropdown.Item value="8" onClick={() => handleMonth('August',8)}>August</Dropdown.Item>
            <Dropdown.Item value="9" onClick={() => handleMonth('September',9)}>September</Dropdown.Item>
            <Dropdown.Item value="10" onClick={() => handleMonth('October',10)}>October</Dropdown.Item>
            <Dropdown.Item value="11" onClick={() => handleMonth('November',11)}>November</Dropdown.Item>
            <Dropdown.Item value="12" onClick={() => handleMonth('December',12)}>December</Dropdown.Item>
          </Dropdown>
            </div>
          </div>
          {loading?( <div className="flex justify-center items-center h-screen">
        <Circles color="#4fa94d" height={80} width={80} />
      </div>):
          <DataTable list={list?.data}/>
        }
          <div className="flex overflow-x-auto items-center justify-center mt-5">
            <div className="flex justify-center items-center mr-4 mt-2">
              Page: {list.page}
            </div>
            <Pagination
              layout="navigation"
              currentPage={currentPage}
              totalPages={list.total<=5?1:(list.total)/5}
              onPageChange={onPageChange}
              showIcons
            />
            <div className="flex justify-center items-center ml-4 mt-2">
              Per Page: {list.perPage}
            </div>
          </div>
          <div className="flex items-center justify-center mt-3">
            <span className="flex font-medium text-zinc-800">Total Entries:</span> 
            <span>{list?.total}</span>
          </div>
        </div>
      </section>
      {/* statics of the month */}
      <section className="bg-slate-50 py-24">
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <h2 className="relative w-fit text-center tracking-tight items-center justify-center font-bold text-5xl md:text-6xl text-gray-900 !leading-tight order-1  mt-2">
              Statics{" "}
              <span className="relative px-2 ">
                -
                {/* <Icons.underline className="hidden sm:block pointer-events-none text-green-500 absolute -bottom-6 inset-x-0"/> */}
              </span>{" "}
              <span className="text-green-500">{month.monthName}</span>
            </h2>
          </div>

          <div className="overflow-x-auto w-[90%] md:w-[80%] lg:w-[60%]">
            <Table className="border-2 shadow-2xl">
              <Table.Head>
                <Table.HeadCell className="bg-zinc-800 text-white">
                  Information
                </Table.HeadCell>
                <Table.HeadCell className="bg-zinc-800 text-white">
                  Quantity
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {"Total Sale"}
                  </Table.Cell>
                  <Table.Cell>{stats?.saleAmount}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Total Sold Items
                  </Table.Cell>
                  <Table.Cell>{stats?.numberOfSoldItems}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Total Unsold Items
                  </Table.Cell>
                  <Table.Cell>{stats?.numberOfUnSoldItems}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </section>
      {/* end */}
      {/* bar char  start*/}
      <section className="py-24 bg-slate-100">
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <h2 className="relative w-fit text-center tracking-tight items-center justify-center font-bold text-5xl md:text-6xl text-gray-900 !leading-tight order-1  mt-2">
              Bar Chart <span className="bg-zinc-900 text-white">{" Stats "}</span>{" "}
              <span className="relative px-2 hidden lg:contents">
                -
                {/* <Icons.underline className="hidden sm:block pointer-events-none text-green-500 absolute -bottom-6 inset-x-0"/> */}
              </span>{" "}
              <span className="text-green-500">{month.monthName}</span>
            </h2>
          </div>
          <div className="w-[100%] lg:w-[80%] mb-5">
          <BarChart chartData={chartData} />
          </div>
        </div>
      </section>
      {/* bar char  end*/}
      {/* Pie char  start*/}
      <section className="py-24 ">
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <h2 className="relative w-fit text-center tracking-tight items-center justify-center font-bold text-5xl md:text-6xl text-gray-900 !leading-tight order-1  mt-2">
              <span className="bg-zinc-900 text-white">{" Pie Chart "}</span> Stats{" "}
              <span className="relative px-2  hidden lg:contents">
                -
                {/* <Icons.underline className="hidden sm:block pointer-events-none text-green-500 absolute -bottom-6 inset-x-0"/> */}
              </span>{" "}
              <span className="text-green-500">{month.monthName}</span>
            </h2>
          </div>
          <div className="w-[100%] lg:w-[40%] mb-5">
          <PieChart chartData={pieData} />
          </div>
        </div>
      </section>
      {/* Pie char  end*/}
      <section className="bg-slate-200 py-24">
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <h2 className="relative w-fit text-center tracking-tight items-center justify-center font-bold text-5xl md:text-6xl text-gray-900 !leading-tight order-1  mt-2">
              What Our{" "}
              <span className="relative px-2">
                Customer
                {/* <Icons.underline className="hidden sm:block pointer-events-none text-green-500 absolute -bottom-6 inset-x-0"/> */}
              </span>{" "}
              Says
            </h2>
          </div>
          <div className="mx-auto grid grid-cols-1 px-4 max-w-2xl lg:max-w-none lg:grid-cols-2 lg:mx-0 gap-y-16 ">
            <div className="flex flex-col col-span-1 gap-5 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5">
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "The bag is spacious and incredibly well-made. I’ve received
                  multiple compliments on the color and style.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    After three months of daily use
                  </span>
                  ,the stitching is still intact, and the material hasn't worn
                  out. My previous bag showed signs of wear within a few weeks.
                  Highly recommend this one!"
                </p>
              </div>
              <div className="flex space-x-3">
                <img
                  className="w-19 h-10 rounded-full"
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.47776910.1722433886&semt=ais_hybrid"
                  alt=""
                />
                <div>
                  <p className="font-semibold">Jack</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified User</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col col-span-1 gap-5 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5">
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "The watchband fits perfectly and is super comfortable. I've
                  had it for almost three months, and the material still looks
                  brand new.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    With my last band
                  </span>
                  , the color started to fade within a month. I’ve gotten
                  several compliments on the sleek design. Very pleased with
                  this purchase!"
                </p>
              </div>
              <div className="flex space-x-3">
                <img
                  className="w-19 h-10 rounded-full"
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.47776910.1722433886&semt=ais_hybrid"
                  alt=""
                />
                <div>
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
