import { Inter } from "next/font/google";
import ViewerNoSSR from "@/components/ViewerNoSSR";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

interface tHomeProps {
  posts: number[];
  formattedDate: string;
}

const Home: React.FC<tHomeProps> = props => {
  const { formattedDate } = props;
  return <ViewerNoSSR />;
};

export default Home;

export async function getStaticProps() {
  const buildDate = Date.now();
  try {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "long",
    }).format(buildDate);

    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
    );
    const postIds: number[] = await res.json();
    return {
      props: {
        posts: postIds,
        formattedDate,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
