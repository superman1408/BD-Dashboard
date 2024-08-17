import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";
import Dashboard from "./Dashboard";

const Maindashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts);
  console.log(posts);

  return <div>{/* <Dashboard /> */}</div>;
};

export default Maindashboard;
