import dynamic from "next/dynamic";

const ViewerNoSSR = dynamic(() => import("@/components/Viewer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default ViewerNoSSR as any;
