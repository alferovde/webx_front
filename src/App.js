import axios from "axios";
import style from "./style.css";
import React from "react";
import Pagination from "./Pagination";

function App() {
  const [data, setData] = React.useState([]);
  const column = [
    {
      name: "Дата",
      value: "date",
    },
    {
      name: "Название",
      value: "name",
    },
    {
      name: "Количество",
      value: "quantity",
    },
    {
      name: "Расстояние",
      value: "distance",
    },
  ];

  const condition = [
    {
      name: "Равно",
      value: "=",
    },
    {
      name: "Содержит",
      value: "LIKE",
    },
    {
      name: "Больше",
      value: ">",
    },
    {
      name: "Меньше",
      value: "<",
    },
  ];
  const [filterCol, setFilterCol] = React.useState("date");
  const [filterCondition, setFilterCondition] = React.useState("LIKE");
  const [textValue, setTextValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [visiblePage, setVisiblePage] = React.useState(5);

  let query = {
    filterCol: filterCol,
    filterCondition: filterCondition,
    textValue: textValue,
  };
  React.useEffect(() => {
    axios
      .get(
        `http://localhost:8080/?con1=${filterCol}&con2=${filterCondition}&con3=${textValue}`
      )
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {});
  }, [textValue, filterCol, filterCondition]);

  const colHandler = (e) => {
    setFilterCol(e.target.value);
  };

  const conditionHandler = (e) => {
    setFilterCondition(e.target.value);
  };

  //Данные для пагинации: индексы первой и последней записи
  //Массив, откуда и отрисовываем данные выбранной страницы.
  //Получаем копированием из data тех элементов, которые удовлетворяют началу и концу элементов на странице
  const lastPage = currentPage * visiblePage;
  const firstPage = lastPage - visiblePage;
  const currentPageIndex = data.slice(firstPage, lastPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <div className="filter" colHandler={colHandler}>
        <h4>Фильтр</h4>
        <select name="" id="" onChange={(e) => colHandler(e)}>
          {column.map((item) => {
            return <option value={item.value}>{item.name}</option>;
          })}
        </select>
        <select name="" id="" onChange={(e) => conditionHandler(e)}>
          {condition.map((item) => {
            return <option value={item.value}>{item.name}</option>;
          })}
        </select>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setTextValue(e.target.value.toLocaleLowerCase())}
        />
        <input
          type="number"
          placeholder="Количество элементов на странице"
          onChange={(e) => setVisiblePage(e.target.value)}
          min={1}
          max={data.length}
        />

        <select name="" id=""></select>
      </div>
      <table className="main-table">
        <tr>
          {column.map((item) => {
            return <th>{item.name}</th>;
          })}
        </tr>

        {currentPageIndex?.map((item) => {
          return (
            <tr className="">
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.distance}</td>
            </tr>
          );
        })}
      </table>
      <Pagination
        visiblePage={visiblePage}
        totalPage={data.length}
        changePage={changePage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
