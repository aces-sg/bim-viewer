import React, { useEffect } from "react";
import * as auth from "@/components/Auth/auth";
import { Inter } from "next/font/google";
import ViewerNoSSR from "@/components/ViewerNoSSR";

const inter = Inter({ subsets: ["latin"] });

interface tHomeProps {
  posts: number[];
  formattedDate: string;
}

async function getUser() {
  try {
    let res = await auth.getCurrentUser();
  } catch (e) {
    console.log("failed to get user", e);
  }
}

const Home: React.FC<tHomeProps> = props => {
  const { formattedDate } = props;

  useEffect(() => {
    getUser();
  }, []);

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
