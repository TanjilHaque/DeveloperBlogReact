import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";

const Home = () => {
  const [userName, setUserName] = useState([]);
  const nameRef = useRef("");
  let value;
  const db = getDatabase();
  const userRef = ref(db, "/users");
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    const dataArr = Object.values(data);
    useEffect(()=>{
        setUserName(dataArr[0].username)
    },[])
  });

  return (
    <div className="container mx-auto">
      <nav className="flex justify-between items-center bg-sky-500">
        <div>Logo</div>
        <div>nav item</div>
        <div>button</div>
      </nav>
      <div ref={nameRef}>Welcome {userName}</div>
        <Link className="p-5 bg-green-400 text-xl cursor-pointer" to={"/profile"}>Goto Profile Page</Link>

    </div>
  );
};

export default Home;
