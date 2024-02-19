import CheckBox from "@/components/CheckBox"; // CheckBoxコンポーネントをインポート。
import Graph from "@/components/Graph";
import axios from "axios"; // axiosライブラリをインポート。HTTPリクエストを行うためのライブラリ。
import { useState, useEffect } from "react"; // useStateとuseEffectフックをインポート。

// Homeという名前のReact関数コンポーネントを定義。
const Home: React.FC = () => {
  // 都道府県のデータを保持するためのステートを定義。
  const [prefectures, setPreFectures] = useState<{
    result: {
      prefCode: number; // 都道府県コード
      prefName: string; // 都道府県名
    }[];
  } | null>(null);

  // 都道府県の人口データを保持するためのステートを定義。
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);
  // useEffectフックを使用して、コンポーネントのマウント時に都道府県のデータを取得。
  useEffect(() => {
    // API 都道府県一覧を取得。
    axios
      // RESAS(地域経済分析システム)のAPIから都道府県一覧を取得。
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": "API-KEYを入力" },
      })
      // thenで成功した場合の処理
      .then((results) => {
        // データの取得に成功した場合、取得したデータをステートにセット。
        setPreFectures(results.data);
        // console.log(results.data);
      })
      // catchでエラー時の挙動を定義
      .catch((error) => {
        // console.log(error.message);
      });
  }, []); // useEffectの依存配列が空なので、このエフェクトはコンポーネントのマウント時にのみ実行。

  // 都道府県のチェックボックスの状態が変更されたときに呼び出されるハンドラ関数を定義。
  const handler = (prefName: string, prefCode: number, check: boolean) => {
    // 現在の人口データのステートをコピー。
    let c_prefPopulation = prefPopulation.slice();
    // チェックボックスがチェックされた場合、都道府県の人口データを取得。
    if (check) {
      // API 都道府県コードを取得。
      axios
        .get(
          // RESASのAPIから指定した「都道府県の人口データ」を取得。
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
            String(prefCode),
          {
            headers: {
              "X-API-KEY": "API-KEYを入力",
            },
          }
        )
        // thenで成功した場合の処理。
        .then((res) => {
          // データの取得に成功した場合、取得したデータをステートに追加。
          c_prefPopulation.push({
            prefName: prefName,
            data: res.data.result.data[0].data,
          });
          setPrefPopulation(c_prefPopulation);
          // console.log("成功" + prefCode + prefName);
        })
        // catchでエラー時の挙動を定義。
        .catch((error) => {
          // console.log(error.message);
          return;
        });
    } else {
      const deleteIndex = c_prefPopulation.findIndex(
        (value) => value.prefName === prefName
      );
      c_prefPopulation.splice(deleteIndex, 1);
      setPrefPopulation(c_prefPopulation);
      // console.log("キャンセル" + prefCode + prefName);
    }
  };
  // 都道府県のデータが存在する場合、CheckBoxコンポーネントをレンダリング。
  //CheckBoxコンポーネントをレンダリング。
  return (
    <>
      <div>
        <h1>都道府県別の総人口推移</h1>
        <h2>都道府県</h2>
        {prefectures && (
          <CheckBox prefectures={prefectures.result} onChange={handler} />
        )}
      </div>
      <div>
        <h2>人口推移グラフ</h2>
        <Graph population={prefPopulation}></Graph>
      </div>
    </>
  );
};
export default Home; // Homeコンポーネントをエクスポート。
