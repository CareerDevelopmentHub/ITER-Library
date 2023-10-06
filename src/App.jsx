import { useState, useEffect } from "react";
import "./App.css";
import BookCard from "./components/BookCard";
import Spinner from "./components/Spinner";

function App() {
  const [Data, setData] = useState([]);
  const [FilteredList, setFilteredList] = useState([]);
  const [APILoaded, setAPILoaded] = useState(false);
  const [IsSpinner, setSpinner] = useState(true);
  const [DarkMode, setDarkMode] = useState(false);
  const [isCached, setIsCached] = useState(false);
  useEffect(() => {
    cachedData();
    modeCheck();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetch(process.env.REACT_APP_API_URL)
        .then((data) => {
          return data.json();
        })
        .then((library) => {
          if (!isCached) {
            setData(library);
            setFilteredList(library);
          }
          setSpinner(false);
          console.log("Data loaded from APi");
          localStorage.setItem("LIB_DATA", JSON.stringify(library));
          localStorage.setItem(
            "L_API_UPDATE",
            new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString()
          );
          setAPILoaded(true);
        });
    } catch (error) {
      console.error(error);
      setSpinner(false);
      // alert("Something went wrong.. Kindly Reload!\n" + error);
      console.error(error);
    }
  };

  const cachedData = () => {
    if (localStorage.getItem("LIB_DATA") != null) {
      setData(JSON.parse(localStorage.getItem("LIB_DATA")));
      setFilteredList(JSON.parse(localStorage.getItem("LIB_DATA")));
      setIsCached(true);
      setSpinner(false);
    } else {
      setIsCached(false);
    }
  };

  const modeCheck = () => {
    if (localStorage.getItem("D_mode") === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  const handleSearch = (e) => {
    const string = e.target.value;
    const filteredList = Data.filter((d) => {
      return Object.values(d)
        .join(" ")
        .toLowerCase()
        .includes(string.toLowerCase());
    });
    setFilteredList(filteredList);
  };

  const toggleMode = () => {
    if (DarkMode) {
      setDarkMode(false);
      localStorage.setItem("D_mode", "false");
    } else {
      setDarkMode(true);
      localStorage.setItem("D_mode", "true");
    }
  };

  const subjectSearch = (sub) => {
    const string = sub;
    const filteredList = Data.filter((d) => {
      return Object.values(d)
        .join(" ")
        .toLowerCase()
        .includes(string.toLowerCase());
    });
    if (filteredList.length === 0) {
      alert("Sorry, No file found!\nWe will upload soon!");
      return;
    }
    setFilteredList(filteredList);
  };

  return (
    <div
      style={DarkMode ? { backgroundColor: "rgba(4, 10, 31, 1.545)" } : null}
      className={"App"}
    >
      <button className="toggleButton" onClick={toggleMode}>
        {DarkMode ? "🔆" : "🌙"}
      </button>

      <center>
        <div
          style={DarkMode ? { color: "white" } : { color: "black" }}
          className={"heading"}
        >
          ITER LIBRARY
        </div>
        <div className="searchBar">
          <input
            style={
              DarkMode
                ? { color: "white" }
                : { color: "black", borderBottomColor: "black" }
            }
            onChange={handleSearch}
            placeholder={"Search anything..."}
            type="text"
          />
        </div>

        <div className="subSearch">
          <div className="subText">Choose Your Filter</div>
          <button
            style={{ backgroundColor: "red", color: "white" }}
            title="Clear filter"
            key={-1}
            onClick={() => subjectSearch("")}
          >
            Clear filter
          </button>
          {[
            "BOOK",
            "SOLUTION",
            "LESSON PLAN",
            "UPM",
            "CCT",
            "CALCULUS",
            "DM",
            "ICP",
            "UPM LAB",
            "ICP LAB",
            "UPM ASSIGNMENT",
            "DM ASSIGNMENT",
            "CALCULUS ASSIGNMENT",
            "CCT ASSIGNMENT",
            "ICP ASSIGNMENT",
          ].map((s, i) => {
            return (
              <button
                title="Click to filter"
                key={i}
                onClick={() => subjectSearch(s)}
              >
                {s}
              </button>
            );
          })}
        </div>
        {IsSpinner ? (
          <Spinner />
        ) : (
          FilteredList.map((d, i) => {
            return (
              <BookCard
                key={i}
                title={d.name}
                v_link={d.view}
                sub={d.sub}
                url={d.url}
                sl={i + 1}
                tags={d.o_details}
                id={d.id}
              />
            );
          })
        )}

        <div className="footer">
          {[
            {
              name: "⭐ Subhranshu Choudhury",
              link: "https://about.me/subhranshu",
            },
            {
              name: "Thanks to Harsh Raj",
              link: "https://instagram.com/itsharssshhh",
            },
          ].map((u, i) => {
            return (
              <>
                <a key={i} href={u.link} target={"_blank"}>
                  {u.name}
                </a>
                {i % 2 == 0 ? <span>|</span> : null}
              </>
            );
          })}
          <br />
          <a href="">
            UPDATED ON: {localStorage.getItem("L_API_UPDATE")}
            {APILoaded ? " ✅Loaded 100%" : " 🍵Loading..."}
          </a>
        </div>
      </center>
    </div>
  );
}

export default App;
