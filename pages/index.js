import Head from "next/head";
import { useCallback, useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [describeInput, setDescribeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ describe: describeInput }),
      });

      const tmpResult = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log("tmpresult: ", tmpResult);
      setResult(tmpResult.data);
      setDescribeInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  const renderResultImages = useCallback(() => {
    if (result) {
      return result.map((r) => {
        console.log("render image: ", r);
        return (
          <div
            style={{
              float: "left",
              width: "256px",
              height: "256px",
              backgroundImage: `url(${r.url})`,
              backgroundSize: "cover",
            }}
          ></div>
        );
      });
    } else {
      return <></>;
    }
  }, [result]);

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="describe"
            placeholder="Enter a describe"
            value={describeInput}
            onChange={(e) => setDescribeInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        {/* <div style={{ width: "100%" }}>{renderResultImages()}</div> */}
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
