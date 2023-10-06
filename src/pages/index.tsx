import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Viewer from "@/components/Viewer";
import Sidebar from "@/components/Sidebar";
import World from "@/components/World";
// import './index.css'

const inter = Inter({ subsets: ["latin"] });

interface tHomeProps {
  posts: number[];
  formattedDate: string;
}

export default function Home(props: tHomeProps) {
  const { formattedDate } = props;
  return (
    <div
      id="app"
      style={{
        width: "100vw",
        height: "100vh",
        // display: "grid",
        // gridTemplateColumns: "60px 1fr",
        // gridTemplateAreas: "sidebar viewer",
      }}
    >
      <World />
      <Sidebar />
    </div>
  );
}

export async function getStaticProps() {
  const buildDate = Date.now();
  try {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "long",
    }).format(buildDate);

    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
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
