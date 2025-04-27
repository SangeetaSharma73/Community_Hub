// components/PostCard/PostSkeleton.js
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = () => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        marginBottom: "20px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <Skeleton circle height={50} width={50} style={{ marginRight: 10 }} />
        <div style={{ flex: 1 }}>
          <Skeleton width={120} height={16} />
          <Skeleton width={80} height={12} style={{ marginTop: 4 }} />
        </div>
      </div>

      <Skeleton width={80} height={20} style={{ marginBottom: 10 }} />

      <Skeleton height={20} width={`60%`} style={{ marginBottom: 10 }} />
      <Skeleton count={2} />

      <div style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
        <Skeleton
          width={80}
          height={35}
          style={{ borderRadius: 20, marginRight: 10 }}
        />
        <Skeleton width={80} height={35} style={{ borderRadius: 20 }} />
        <Skeleton width={60} height={20} style={{ marginLeft: "auto" }} />
      </div>
    </div>
  );
};

export default PostSkeleton;
