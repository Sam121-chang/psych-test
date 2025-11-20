"use client";

export default function PayPage() {
  const goTest = () => {
    window.location.href = "/test";
  };

  return (
    <div style={{ padding: 40, fontSize: 24 }}>
      <div>测试入口（已取消收费）</div>

      <button
        onClick={goTest}
        style={{
          marginTop: 40,
          padding: "18px 32px",
          backgroundColor: "blue",
          color: "#fff",
          fontSize: 22,
          borderRadius: 12,
        }}
      >
        直接开始测试
      </button>
    </div>
  );
}
